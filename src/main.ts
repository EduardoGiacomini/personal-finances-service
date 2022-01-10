import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BusinessExceptionFilter } from './infra/config/exceptions';
import { API_PORT } from './infra/config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BusinessExceptionFilter());
  await app.listen(API_PORT);
}

bootstrap();
