import { Test, TestingModule } from '@nestjs/testing';
import { RmqContext } from '@nestjs/microservices';

import { UpdateOrderStatusByIdUseCase } from '@core/modules/orders/application/use-case/update-order-status-by-id.use-case';

import { OrderStatusAlreadyFinishedError } from '@core/modules/orders/application/errors/order-status-already-finished-error';
import { PaymentConfirmedConsumer } from '@adapters/drivers/rmq/consumers/payment-confirmed.consumer';
import { PaymentConfirmedDTO } from '@adapters/drivers/rmq/consumers/dtos/payment-confirmed.dto';
import { OrderMapping } from '@adapters/drivers/rmq/mapping/order-mapping';
import { Order } from '@core/modules/orders/entities/order';
import { left, right } from '@core/common/entities/either';

describe('PaymentConfirmedConsumer', () => {
  let consumer: PaymentConfirmedConsumer;
  let updateOrderStatusByIdUseCase: UpdateOrderStatusByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentConfirmedConsumer,
        {
          provide: UpdateOrderStatusByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    consumer = module.get<PaymentConfirmedConsumer>(PaymentConfirmedConsumer);
    updateOrderStatusByIdUseCase = module.get<UpdateOrderStatusByIdUseCase>(
      UpdateOrderStatusByIdUseCase,
    );
  });

  it('should process payment confirmation and publish production:ready message', async () => {
    const mockContext = {
      getChannelRef: jest.fn().mockReturnValue({
        publish: jest.fn(),
        ack: jest.fn(),
      }),
      getMessage: jest.fn().mockReturnValue({}),
    } as unknown as RmqContext;

    const mockData: PaymentConfirmedDTO = {
      order_id: 'test-order-id',
    };

    const mockOrder = Order.create({
      code: '1',
      status: 'FINALIZADO',
      total_amount: 8,
      total_price: 80,
      client: null,
    });

    jest
      .spyOn(updateOrderStatusByIdUseCase, 'execute')
      .mockResolvedValue(right({ order: mockOrder }));

    await consumer.handleTestEvent(mockData, mockContext);

    expect(updateOrderStatusByIdUseCase.execute).toHaveBeenCalledWith({
      id: mockData.order_id,
    });

    expect(mockContext.getChannelRef().publish).toHaveBeenCalledWith(
      'amq.direct',
      'production:ready',
      Buffer.from(
        JSON.stringify({
          pattern: 'production:ready',
          data: OrderMapping.toView(mockOrder),
        }),
      ),
    );

    expect(mockContext.getChannelRef().ack).toHaveBeenCalled();
  });

  it('should throw OrderStatusAlreadyFinishedError if the order is already finished', async () => {
    const mockContext = {
      getChannelRef: jest.fn().mockReturnValue({
        publish: jest.fn(),
        ack: jest.fn(),
      }),
      getMessage: jest.fn().mockReturnValue({}),
    } as unknown as RmqContext;

    const mockData: PaymentConfirmedDTO = {
      order_id: 'test-order-id',
    };

    jest
      .spyOn(updateOrderStatusByIdUseCase, 'execute')
      .mockResolvedValueOnce(left(new OrderStatusAlreadyFinishedError()));

    await expect(
      consumer.handleTestEvent(mockData, mockContext),
    ).rejects.toThrow(OrderStatusAlreadyFinishedError);

    expect(updateOrderStatusByIdUseCase.execute).toHaveBeenCalledWith({
      id: mockData.order_id,
    });

    expect(mockContext.getChannelRef().publish).not.toHaveBeenCalled();
    expect(mockContext.getChannelRef().ack).not.toHaveBeenCalled();
  });

  it('should log and rethrow generic errors', async () => {
    const mockContext = {
      getChannelRef: jest.fn().mockReturnValue({
        publish: jest.fn(),
        ack: jest.fn(),
      }),
      getMessage: jest.fn().mockReturnValue({}),
    } as unknown as RmqContext;

    const mockData: PaymentConfirmedDTO = {
      order_id: 'test-order-id',
    };

    jest
      .spyOn(updateOrderStatusByIdUseCase, 'execute')
      .mockRejectedValue(new Error('Generic error'));

    await expect(
      consumer.handleTestEvent(mockData, mockContext),
    ).rejects.toThrow('Generic error');

    expect(updateOrderStatusByIdUseCase.execute).toHaveBeenCalledWith({
      id: mockData.order_id,
    });

    expect(mockContext.getChannelRef().publish).not.toHaveBeenCalled();
    expect(mockContext.getChannelRef().ack).not.toHaveBeenCalled();
  });
});
