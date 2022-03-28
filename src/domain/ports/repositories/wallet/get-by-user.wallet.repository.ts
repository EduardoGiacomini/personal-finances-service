import { Wallet } from "@domain/entities";

export interface GetByUserWalletRepository {
  getByUser(userId: Wallet["user"] | Wallet["user"]["_id"]): Promise<Wallet>;
}
