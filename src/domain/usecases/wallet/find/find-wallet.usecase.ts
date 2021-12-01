import { NotFoundBusinessException } from '../../../exceptions/not-found.business.exception';
import { WalletsRepository } from '../../../data-providers/wallets.repository';
import { Wallet } from '../../../entities/wallet';

export class FindWalletUseCase {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async execute(userId: string): Promise<Wallet> {
    const wallet = await this.findWallet(userId);
    this.checkIfWalletExists(wallet, userId);
    return wallet;
  }

  async findWallet(userId: string): Promise<Wallet> {
    return this.walletsRepository.findWalletByUserId(userId);
  }

  checkIfWalletExists(wallet: Wallet, userId: string): void {
    if (!wallet) {
      throw new NotFoundBusinessException(
        `The wallet from user ${userId} does not exist`,
      );
    }
  }
}
