import { NotFoundBusinessException } from '../../../exceptions/not-found.business.exception';
import { UsersRepository } from '../../../data-providers/users.repository';
import { WalletsRepository } from '../../../data-providers/wallets.repository';
import { Wallet } from '../../../entities/wallet';
import { DefaultBusinessException } from '../../../exceptions/default.business.exception';

export class CreateWalletUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly walletRepository: WalletsRepository,
  ) {}

  async execute(userId: string): Promise<Wallet> {
    await this.checkIfUserExists(userId);
    await this.checkIfUserAlreadyHasAWallet(userId);
    return this.createUserWallet(userId);
  }

  async checkIfUserExists(userId: string) {
    const userFound = await this.usersRepository.findUserById(userId);
    if (!userFound) {
      throw new NotFoundBusinessException(`The user ${userId} does not exist`);
    }
  }

  async checkIfUserAlreadyHasAWallet(userId: string) {
    const walletFound = await this.walletRepository.findWalletByUserId(userId);
    if (walletFound) {
      throw new DefaultBusinessException(
        `The user ${userId} already has a wallet`,
      );
    }
  }

  async createUserWallet(userId: string) {
    const wallet = <Wallet>{ user: userId, value: 0.0 };
    return this.walletRepository.createWallet(wallet);
  }
}
