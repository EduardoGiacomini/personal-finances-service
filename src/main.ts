import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DefaultExceptionFilter } from './application/config/exceptions/default.exception.filter';
import { NotFoundExceptionFilter } from './application/config/exceptions/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new DefaultExceptionFilter(),
    new NotFoundExceptionFilter(),
  );
  await app.listen(3000);
}

bootstrap();
