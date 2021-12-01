import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPostgresRepository } from '../../../data-providers/user/users.postgres.repository';
import { WalletsPostgresRepository } from '../../../data-providers/wallet/wallets.postgres.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersPostgresRepository,
      WalletsPostgresRepository,
    ]),
  ],
  controllers: [WalletController],
})
export class WalletModule {}
