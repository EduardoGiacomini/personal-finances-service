import { Controller, Param, Post } from '@nestjs/common';
import { Wallet } from '../../../core/entities/wallet';
import { CreateWalletUseCase } from '../../../core/usecases/wallet/create-wallet.usecase';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPostgresRepository } from '../../data-providers/user/users.postgres.repository';
import { WalletsPostgresRepository } from '../../data-providers/wallet/wallets.postgres.repository';

@Controller('users/:userId/wallets')
export class WalletController {
  private readonly createWalletUseCase: CreateWalletUseCase;

  constructor(
    @InjectRepository(UsersPostgresRepository)
    private usersRepository: UsersPostgresRepository,
    @InjectRepository(WalletsPostgresRepository)
    private walletsRepository: WalletsPostgresRepository,
  ) {
    this.createWalletUseCase = new CreateWalletUseCase(
      usersRepository,
      walletsRepository,
    );
  }

  @Post()
  create(@Param('userId') userId: string): Promise<Wallet> {
    return this.createWalletUseCase.execute(userId);
  }
}
