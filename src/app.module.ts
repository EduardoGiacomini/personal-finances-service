import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabasePostgresConfig } from './infra/config/database/database.postgres.config';
import { AccountModule } from './infra/adapters/http/account';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabasePostgresConfig.create()),
    AccountModule,
  ],
})
export class AppModule {}
