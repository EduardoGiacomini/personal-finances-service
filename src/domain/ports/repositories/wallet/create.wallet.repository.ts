import { Wallet } from "@domain/entities";

export interface CreateWalletRepository {
  createWallet(wallet: Wallet): Promise<Wallet>;
}
