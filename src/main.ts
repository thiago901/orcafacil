import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { EnvService } from '@adapters/drivens/infra/envs/env.service';
import { patchNestJsSwagger } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  app.enableCors({
    origin:
      envService.get('ENVIRONMENT') === 'DEV'
        ? '*'
        : ['https://orcafacilweb.vercel.app', 'https://orcalink.com.br'],

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [envService.get('AMQP_URL')],
      queue: envService.get<any>('AMQP_QUEUES').NOTIFICATION_QUEUE.name,
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  });

  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle('OrçaLink API')
    .setDescription('Documentação das APIs do OrçaLink')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {});

  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  app.use(
    '/payments/webhooks/stripe',
    bodyParser.raw({ type: 'application/json' }),
  );

  await app.startAllMicroservices();
  await app.listen(Number(envService.get('PORT')) || 3333, '0.0.0.0');
}
bootstrap();
