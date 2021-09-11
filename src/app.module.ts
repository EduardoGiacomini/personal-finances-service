import { Module } from '@nestjs/common';
import { UserModule } from './application/entrypoint/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabasePostgresConfig } from './application/config/database/database.postgres.config';

@Module({
  imports: [TypeOrmModule.forRoot(DatabasePostgresConfig.create()), UserModule],
})
export class AppModule {}
