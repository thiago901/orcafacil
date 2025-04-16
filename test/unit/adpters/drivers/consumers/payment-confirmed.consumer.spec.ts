import { Test, TestingModule } from '@nestjs/testing';

import { UpdateOrderStatusByIdUseCase } from '@core/modules/orders/application/use-case/update-order-status-by-id.use-case';
import { RmqContext } from '@nestjs/microservices';
import { OrderStatusAlreadyFinishedError } from '@core/modules/orders/application/errors/order-status-already-finished-error';
import { left, right } from '@core/common/entities/either';
import { PaymentConfirmedConsumer } from '@adapters/drivers/rmq/consumers/payment-confirmed.consumer';
import { OrderMapping } from '@adapters/drivers/rmq/mapping/order-mapping';
import { Order } from '@core/modules/orders/entities/order';

describe('PaymentConfirmedConsumer', () => {
  let consumer: PaymentConfirmedConsumer;
  let updateOrderStatusByIdUseCase: UpdateOrderStatusByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentConfirmedConsumer],
      providers: [
        {
          provide: UpdateOrderStatusByIdUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    consumer = module.get<PaymentConfirmedConsumer>(PaymentConfirmedConsumer);
    updateOrderStatusByIdUseCase = module.get<UpdateOrderStatusByIdUseCase>(
      UpdateOrderStatusByIdUseCase,
    );
  });

  describe('handleTestEvent', () => {
    it('should update order status and publish a message', async () => {
      const mockData = { order_id: '123' };
      const mockOrder = Order.create({
        code: '1',
        status: 'FINALIZADO',
        total_amount: 8,
        total_price: 80,
        client: null,
      });
      const mockContext = {
        getChannelRef: jest.fn().mockReturnValue({
          publish: jest.fn(),
          ack: jest.fn(),
        }),
        getMessage: jest.fn().mockReturnValue({}),
      } as unknown as RmqContext;

      jest.spyOn(updateOrderStatusByIdUseCase, 'execute').mockResolvedValueOnce(
        right({
          order: mockOrder,
        }),
      );

      await consumer.handleTestEvent(mockData, mockContext);

      expect(updateOrderStatusByIdUseCase.execute).toHaveBeenCalledWith({
        id: '123',
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
      expect(mockContext.getChannelRef().ack).toHaveBeenCalledWith(
        mockContext.getMessage(),
      );
    });

    it('should throw OrderStatusAlreadyFinishedError if order is finished', async () => {
      const mockData = { order_id: '123' };
      const mockContext = {
        getChannelRef: jest.fn().mockReturnValue({
          publish: jest.fn(),
          ack: jest.fn(),
        }),
        getMessage: jest.fn().mockReturnValue({}),
      } as unknown as RmqContext;

      jest
        .spyOn(updateOrderStatusByIdUseCase, 'execute')
        .mockResolvedValueOnce(left(new OrderStatusAlreadyFinishedError()));

      await expect(
        consumer.handleTestEvent(mockData, mockContext),
      ).rejects.toBeInstanceOf(Error);
    });

    it('should handle generic errors gracefully', async () => {
      const mockData = { order_id: '123' };
      const mockContext = {
        getChannelRef: jest.fn().mockReturnValue({
          publish: jest.fn(),
          ack: jest.fn(),
        }),
        getMessage: jest.fn().mockReturnValue({}),
      } as unknown as RmqContext;

      jest
        .spyOn(updateOrderStatusByIdUseCase, 'execute')
        .mockRejectedValueOnce(new Error('Generic error'));

      await expect(
        consumer.handleTestEvent(mockData, mockContext),
      ).rejects.toThrow(Error);

      // Aqui o erro será apenas logado no console e não interrompe a execução.
    });
  });
});
