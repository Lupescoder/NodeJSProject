import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { initializeFirebase } from './firebase.config';

async function bootstrap() {
  dotenv.config();
  initializeFirebase();
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Igut Pacientes API')
    .setDescription('The API of pacientes app')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Usuários')
    .addTag('Endereço')
    .addTag('Login')
    .addTag('Historico Médico')
    .addTag('Histórico Medicamentos')
    .addTag('Convênios')
    .addTag('Convênios Usuários')
    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app, document);
  
  await app.listen(3000);
}
bootstrap();
