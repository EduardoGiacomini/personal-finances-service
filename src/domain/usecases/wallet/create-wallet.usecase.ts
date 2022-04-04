import { UseCase } from "@domain/protocol";
import { User, Wallet } from "@domain/entities";
import {
  CreateWalletRepository,
  GetByUserWalletRepository,
} from "@domain/ports/repositories/wallet";
import { WalletAlreadyExistsException } from "@domain/exceptions/domain/wallet";

export class CreateWalletUseCase implements UseCase {
  private readonly INITIAL_WALLET_VALUE = 0;

  constructor(
    private readonly getByUserWalletRepository: GetByUserWalletRepository,
    private readonly createWalletRepository: CreateWalletRepository
  ) {}

  async execute({ user }: CreateWalletInput): Promise<CreateWalletOutput> {
    await this.checkIfUserAlreadyHasAnWallet(user);
    const wallet = await this.createNewWallet(user);
    return { wallet };
  }

  private async checkIfUserAlreadyHasAnWallet(user) {
    const wallet = await this.getByUserWalletRepository.getByUser(user._id);
    if (wallet) throw new WalletAlreadyExistsException();
  }

  private async createNewWallet(user) {
    const wallet = { user, value: this.INITIAL_WALLET_VALUE };
    return this.createWalletRepository.createWallet(wallet);
  }
}

export type CreateWalletInput = {
  user: User | User["_id"];
};

export type CreateWalletOutput = {
  wallet: Wallet;
};
