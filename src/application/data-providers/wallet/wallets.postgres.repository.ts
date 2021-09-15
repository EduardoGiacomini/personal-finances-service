import { EntityRepository, Repository } from 'typeorm';
import { WalletPostgresEntity } from './wallet.postgres.entity';
import { WalletsRepository } from '../../../core/data-providers/wallets.repository';
import { Wallet } from '../../../core/entities/wallet';

@EntityRepository(WalletPostgresEntity)
export class WalletsPostgresRepository
  extends Repository<WalletPostgresEntity>
  implements WalletsRepository
{
  async createWallet(wallet: Wallet): Promise<Wallet> {
    const walletToCreate = this.create(wallet);
    await this.save(walletToCreate);
    return walletToCreate;
  }
}
