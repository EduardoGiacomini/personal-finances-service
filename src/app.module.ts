import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabasePostgresFactory } from './infra/config/database/database.postgres.factory';
import { AccountModule } from './infra/adapters/http/account';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabasePostgresFactory.create()),
    AccountModule,
  ],
})
export class AppModule {}
