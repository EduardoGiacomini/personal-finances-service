import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabasePostgresConfig } from './application/config/database/database.postgres.config';
import { WalletModule } from './application/entrypoint/rest/wallet/wallet.module';
import { UserModule } from './application/entrypoint/rest/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabasePostgresConfig.create()),
    UserModule,
    WalletModule,
  ],
})
export class AppModule {}
