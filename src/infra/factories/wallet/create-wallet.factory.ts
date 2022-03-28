import { CreateWalletUseCase } from "@domain/usecases/wallet";
import { WalletMongoRepository } from "@infra/adapters/repositories/wallet";

export class CreateWalletFactory {
  static createUseCase(): CreateWalletUseCase {
    const walletMongoRepository = new WalletMongoRepository();

    return new CreateWalletUseCase(
      walletMongoRepository,
      walletMongoRepository
    );
  }
}
