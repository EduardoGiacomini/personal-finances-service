import { Wallet } from '../../../../domain/entities/wallet';

export interface FindWalletEntrypoint {
  find(userId: string): Promise<Wallet>;
}
