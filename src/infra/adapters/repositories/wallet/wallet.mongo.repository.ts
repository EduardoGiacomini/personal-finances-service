import { Model } from "mongoose";
import WalletMongoEntity from "./wallet.mongo.entity";
import { Wallet } from "@domain/entities";
import {
  CreateWalletRepository,
  GetByUserWalletRepository,
} from "@domain/ports/repositories/wallet";

export class WalletMongoRepository
  implements CreateWalletRepository, GetByUserWalletRepository
{
  private readonly Wallet: Model<Wallet>;

  constructor() {
    this.Wallet = WalletMongoEntity;
  }

  async createWallet({ user, value }: Wallet): Promise<Wallet> {
    const wallet = new this.Wallet({ user, value });
    await wallet.save();
    return wallet;
  }

  async getByUser(
    user: Wallet["user"] | Wallet["user"]["_id"]
  ): Promise<Wallet> {
    return this.Wallet.findOne({ user });
  }
}
