import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  BusinessExceptionFilter,
  InvalidExceptionFilter,
} from './infra/config/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new BusinessExceptionFilter(),
    new InvalidExceptionFilter(),
  );
  await app.listen(3000);
}

bootstrap();
