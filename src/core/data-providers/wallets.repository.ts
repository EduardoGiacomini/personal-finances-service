import { Wallet } from '../entities/wallet';

export interface WalletsRepository {
  createWallet(wallet: Wallet): Promise<Wallet>;
  findWalletByUserId(user: string): Promise<Wallet>;
}
