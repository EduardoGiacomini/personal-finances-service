import { Wallet } from '../../../../core/entities/wallet';

export interface FindWalletEntrypoint {
  find(userId: string): Promise<Wallet>;
}
