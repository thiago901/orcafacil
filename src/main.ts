import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from '@adapters/drivens/infra/envs/env.service';
import { patchNestJsSwagger } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);

  app.enableCors({
    // origin: ['https://orcafacilweb.vercel.app', '*'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle('OrçaFacil API')
    .setDescription('Documentação das APIs do OrçaFacil')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {});
  // Exporta para JSON
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  await app.listen(Number(envService.get('PORT')) || 3333, '0.0.0.0');
}
bootstrap();
