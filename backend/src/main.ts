import { createDatabase } from 'typeorm-extension';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';



async function bootstrap() {

  await createDB();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}

async function createDB () {
  const options: DataSourceOptions = {
    type: 'mysql',
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    username:  process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE  
  } 

  await createDatabase({options: options});
}


bootstrap();
