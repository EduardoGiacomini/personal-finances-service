import { CreateWalletUseCase } from "@domain/usecases/wallet";
import { WalletAlreadyExistsException } from "@domain/exceptions/domain/wallet/wallet-already-exists.exception";
import { WalletRepositoryMock } from "../../mocks/repositories";

class CreateWalletFactory {
  static create() {
    return new CreateWalletUseCase(WalletRepositoryMock, WalletRepositoryMock);
  }
}

describe("Create Wallet Use Case", () => {
  const user = "507f191e810c19729de860ea";

  describe("when a new object is created", () => {
    it("should have an execute method defined", () => {
      const useCase = CreateWalletFactory.create();

      expect(useCase.execute).toBeDefined();
    });
  });

  describe("when the user already has a wallet", () => {
    it("should throw WalletAlreadyExistsException", async () => {
      WalletRepositoryMock.getByUser.mockReturnValueOnce(
        Promise.resolve(WalletRepositoryMock.wallet)
      );
      const useCase = CreateWalletFactory.create();

      await expect(useCase.execute({ user })).rejects.toThrow(
        WalletAlreadyExistsException
      );
      expect(WalletRepositoryMock.getByUser).toBeCalled();
    });
  });

  describe("when a valid user is informed", () => {
    it("should create an empty wallet", async () => {
      const useCase = CreateWalletFactory.create();

      const { wallet } = await useCase.execute({ user });

      expect(wallet.value).toBe(0);
      expect(WalletRepositoryMock.getByUser).toBeCalled();
      expect(WalletRepositoryMock.createWallet).toBeCalled();
    });
  });
});
