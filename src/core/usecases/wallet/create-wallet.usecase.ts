import { NotFoundBusinessException } from '../../exceptions/not-found.business.exception';
import { UsersRepository } from '../../data-providers/users.repository';
import { WalletsRepository } from '../../data-providers/wallets.repository';
import { Wallet } from '../../entities/wallet';

export class CreateWalletUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly walletRepository: WalletsRepository,
  ) {}

  async execute(userId: string): Promise<Wallet> {
    const userFound = await this.usersRepository.findUserById(userId);

    if (!userFound) {
      throw new NotFoundBusinessException(`The user ${userId} does not exist`);
    }

    const wallet = <Wallet>{ user: userId, value: 0 };
    return this.walletRepository.createWallet(wallet);
  }
}
