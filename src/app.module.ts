import { Module } from '@nestjs/common';
import { UserModule } from './application/entrypoint/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabasePostgresConfig } from './application/config/database/database.postgres.config';
import { WalletModule } from './application/entrypoint/wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabasePostgresConfig.create()),
    UserModule,
    WalletModule,
  ],
})
export class AppModule {}
