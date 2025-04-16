import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

describe('PUT /orders/{id}/status/{status}: Update order status by ID feature', () => {
  let app: INestApplication;
  let response: request.Response;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Scenario: Attempting to update the status of a non-existing order', () => {
    it('should return a 404 error when the order does not exist', async () => {
      const nonExistingId = new UniqueEntityID().toString();
      const status = 'RECEBIDO';

      // When a PUT request is sent to "/orders/{id}/status/{status}" with a non-existing order ID
      response = await request(app.getHttpServer())
        .put(`/orders/${nonExistingId}/status/${status}`)
        .send();

      // Then the response status code should be 404
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Order not found'); // Mensagem de erro adequada
    });
  });
});
