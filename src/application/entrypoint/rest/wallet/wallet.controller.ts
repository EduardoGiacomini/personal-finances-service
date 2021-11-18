import { Controller, Get, Param, Post } from '@nestjs/common';
import { Wallet } from '../../../../core/entities/wallet';
import { CreateWalletUseCase } from '../../../../core/usecases/wallet/create/create-wallet.usecase';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPostgresRepository } from '../../../data-providers/user/users.postgres.repository';
import { WalletsPostgresRepository } from '../../../data-providers/wallet/wallets.postgres.repository';
import { FindWalletUseCase } from '../../../../core/usecases/wallet/find/find-wallet.usecase';
import { FindWalletEntrypoint } from '../../protocol/wallet/find-wallet.entrypoint';

@Controller('users/:userId/wallets')
export class WalletController implements FindWalletEntrypoint {
  private readonly createWalletUseCase: CreateWalletUseCase;
  private readonly findWalletUseCase: FindWalletUseCase;

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
    this.findWalletUseCase = new FindWalletUseCase(walletsRepository);
  }

  @Post()
  create(@Param('userId') userId: string): Promise<Wallet> {
    return this.createWalletUseCase.execute(userId);
  }

  @Get()
  find(@Param('userId') userId: string): Promise<Wallet> {
    return this.findWalletUseCase.execute(userId);
  }
}
