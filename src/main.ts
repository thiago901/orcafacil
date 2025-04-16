import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from '@adapters/drivens/infra/envs/env.service';
import { patchNestJsSwagger } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);

  app.enableCors({ origin: '*' });
  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle('OrçaFacil API')
    .setDescription('Documentação das APIs do OrçaFacil')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {});

  await app.listen(envService.get('PORT'));
}
bootstrap();
