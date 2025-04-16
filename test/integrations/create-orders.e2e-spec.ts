import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as kleur from 'kleur';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '@adapters/drivens/infra/database/prisma/prisma.service';

describe(kleur.bold().cyan('POST /orders: Order creation feature'), () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let response: request.Response;

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
    kleur
      .bold()
      .green('Scenario: Creating an order with valid product details'),
    () => {
      it(kleur.green('should create a new order successfully'), async () => {
        response = await request(app.getHttpServer())
          .post('/orders')
          .send({
            client: {
              name: 'John Doe',
              email: 'john@mail.com',
              document: '14785236920',
            },
            products: [
              {
                id: 'ddc2bc43-2d19-445a-8354-2bdb78d100cd',
                amount: 3,
                unit_price: 3,
                description: 'description',
                name: 'lanche',
              },
              {
                id: 'ddc2bc43-2d19-445a-8354-2bdb78d100ce',
                amount: 3,
                unit_price: 3,
                description: 'description',
                name: 'lanche',
              },
            ],
          });

        expect(response.statusCode).toBe(201);
        console.log(kleur.bold().green('✓ Order created successfully'));

        const orderDb = await prisma.order.findFirst();
        const orderProductDb = await prisma.orderProduct.findMany({
          where: { order_id: orderDb?.id },
        });

        expect(orderDb?.status).toBe('PENDENTE');
        expect(Number(orderDb?.total_amount)).toBe(6);
        expect(orderProductDb).toHaveLength(2);
      });

      it(
        kleur.green('should create a new order successfully without a client'),
        async () => {
          response = await request(app.getHttpServer())
            .post('/orders')
            .send({
              products: [
                {
                  id: 'ddc2bc43-2d19-445a-8354-2bdb78d100cd',
                  amount: 3,
                  unit_price: 3,
                  description: 'description',
                  name: 'lanche',
                },
                {
                  id: 'ddc2bc43-2d19-445a-8354-2bdb78d100ce',
                  amount: 3,
                  unit_price: 3,
                  description: 'description',
                  name: 'lanche',
                },
              ],
            });

          expect(response.statusCode).toBe(201);
          console.log(
            kleur.bold().green('✓ Order created successfully without a client'),
          );

          const orderDb = await prisma.order.findFirst();
          const orderProductDb = await prisma.orderProduct.findMany({
            where: { order_id: orderDb?.id },
          });

          expect(orderDb?.status).toBe('PENDENTE');
          expect(Number(orderDb?.total_amount)).toBe(6);
          expect(orderProductDb).toHaveLength(2);
        },
      );
    },
  );

  describe(
    kleur
      .bold()
      .red('Scenario: Creating an order with invalid product details'),
    () => {
      it(
        kleur.red("shouldn't create a new order with invalid email"),
        async () => {
          response = await request(app.getHttpServer())
            .post('/orders')
            .send({
              client: {
                name: 'John Doe',
                email: 'not-a-mail',
                document: '14785236920',
              },
              products: [
                {
                  id: 'ddc2bc43-2d19-445a-8354-2bdb78d100cd',
                  amount: 3,
                  unit_price: 3,
                  description: 'description',
                  name: 'lanche',
                },
                {
                  id: 'ddc2bc43-2d19-445a-8354-2bdb78d100ce',
                  amount: 3,
                  unit_price: 3,
                  description: 'description',
                  name: 'lanche',
                },
              ],
            });

          expect(response.statusCode).toBe(400);
          console.log(
            kleur.bold().red('Order creation failed due to invalid email'),
          );
        },
      );

      it(
        kleur.red("shouldn't create a new order without required value"),
        async () => {
          response = await request(app.getHttpServer())
            .post('/orders')
            .send({
              client: {
                name: 'John Doe',
                email: 'john@mail.com',
                // document is missing
              },
              products: [
                {
                  id: 'ddc2bc43-2d19-445a-8354-2bdb78d100cd',
                  amount: 3,
                  unit_price: 3,
                  description: 'description',
                  name: 'lanche',
                },
                {
                  id: 'ddc2bc43-2d19-445a-8354-2bdb78d100ce',
                  amount: 3,
                  unit_price: 3,
                  description: 'description',
                  name: 'lanche',
                },
              ],
            });

          expect(response.statusCode).toBe(400);
          console.log(
            kleur
              .bold()
              .red('Order creation failed due to missing required value'),
          );
        },
      );
    },
  );
});
