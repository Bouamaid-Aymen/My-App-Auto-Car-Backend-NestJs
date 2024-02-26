import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const corsOption ={
      origin: ['http://localhost:58021/'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],

  };
  app.enableCors(corsOption)
  await app.listen(process.env.APP_PORT);
}
bootstrap();
