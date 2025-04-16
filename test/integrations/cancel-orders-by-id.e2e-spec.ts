import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { PrismaService } from '@adapters/drivens/infra/database/prisma/prisma.service';

import * as kleur from 'kleur';

describe(
  kleur.cyan('PUT /orders/{id}/cancel: Cancel order by ID feature'),
  () => {
    let app: INestApplication;
    let response: request.Response;
    let prisma: PrismaService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleRef.createNestApplication();
      prisma = moduleRef.get(PrismaService);
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    describe(
      kleur.yellow('Scenario: Successfully canceling an existing order by ID'),
      () => {
        it(
          kleur.green(
            'should cancel the order and return the updated order details when a valid ID is provided',
          ),
          async () => {
            const id = new UniqueEntityID().toString();

            console.log(
              kleur.green(
                'Given an order is created in the database with "PENDENTE" status',
              ),
            );
            await prisma.order.create({
              data: {
                id,
                status: 'PENDENTE',
              },
            });

            console.log(
              kleur.cyan(
                'When a PUT request is sent to "/orders/{id}/cancel" with the valid order ID',
              ),
            );
            response = await request(app.getHttpServer())
              .put(`/orders/${id}/cancel`)
              .send();

            console.log(
              kleur.magenta('Then the response status code should be 200'),
            );
            expect(response.statusCode).toBe(200);

            console.log(
              kleur.magenta(
                'And the response should contain the updated order details',
              ),
            );
            const { order } = response.body;
            expect(order).toBeDefined();
            expect(order.id).toBe(id);
            expect(order.canceled_at).toBeDefined();
          },
        );
      },
    );

    describe(
      kleur.yellow('Scenario: Attempting to cancel a non-existing order'),
      () => {
        it(
          kleur.red('should return a 404 error when the order does not exist'),
          async () => {
            const nonExistingId = new UniqueEntityID().toString();

            console.log(
              kleur.green(
                'Given an order ID that does not exist in the database',
              ),
            );

            console.log(
              kleur.cyan(
                'When a PUT request is sent to "/orders/{id}/cancel" with a non-existing order ID',
              ),
            );
            response = await request(app.getHttpServer())
              .put(`/orders/${nonExistingId}/cancel`)
              .send();

            console.log(
              kleur.magenta('Then the response status code should be 404'),
            );
            expect(response.statusCode).toBe(404);

            console.log(
              kleur.magenta(
                'And the response message should indicate the error',
              ),
            );
            expect(response.body.message).toBe('Order not found');
          },
        );
      },
    );

    describe(
      kleur.yellow('Scenario: Attempting to cancel an already canceled order'),
      () => {
        it(
          kleur.red(
            'should return a 400 error when the order is already canceled',
          ),
          async () => {
            const id = new UniqueEntityID().toString();

            console.log(
              kleur.green(
                'Given an order is created in the database with "CANCELADO" status',
              ),
            );
            await prisma.order.create({
              data: {
                id,
                status: 'CANCELADO',
                canceled_at: new Date(),
              },
            });

            console.log(
              kleur.cyan(
                'When a PUT request is sent to "/orders/{id}/cancel" with the valid order ID',
              ),
            );
            response = await request(app.getHttpServer())
              .put(`/orders/${id}/cancel`)
              .send();

            console.log(
              kleur.magenta('Then the response status code should be 409'),
            );
            expect(response.statusCode).toBe(409);

            console.log(
              kleur.magenta(
                'And the response message should indicate the error',
              ),
            );
            expect(response.body.message).toBe(
              'Order has already been canceled',
            );
          },
        );
      },
    );
  },
);
