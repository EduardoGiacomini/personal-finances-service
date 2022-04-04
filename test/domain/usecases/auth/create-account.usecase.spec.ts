import { UserAlreadyExistsException } from "@domain/exceptions/domain/user";
import { CreateAccountUseCase } from "@domain/usecases/auth";
import { CreateWalletUseCaseMock } from "../../mocks/usecases";
import { UserRepositoryMock } from "../../mocks/repositories";
import { EncryptorServiceMock } from "../../mocks/services";

class CreateAccountFactory {
  static create(): CreateAccountUseCase {
    return new CreateAccountUseCase(
      UserRepositoryMock,
      UserRepositoryMock,
      EncryptorServiceMock,
      CreateWalletUseCaseMock
    );
  }
}

describe("Create Account Use Case", () => {
  const userToCreate = {
    name: "John",
    email: "john@gmail.com",
    password: "verysecretpassword",
  };

  describe("when a new object is created", () => {
    it("should have an execute method defined", () => {
      const useCase = CreateAccountFactory.create();

      expect(useCase.execute).toBeDefined();
    });
  });

  describe("when the email is aready in use", () => {
    it("should throw UserAlreadyExistsException", async () => {
      const useCase = CreateAccountFactory.create();

      await expect(useCase.execute(userToCreate)).rejects.toThrowError(
        UserAlreadyExistsException
      );
    });
  });

  describe("when a new user email is provided", () => {
    it("should encrypt the password, create a user wallet, create the user", async () => {
      const expectedUser = {
        _id: "507f191e810c19729de860ea",
        name: "John",
        email: "john@gmail.com",
        active: true,
        createdAt: new Date(2022, 1, 1),
        updatedAt: new Date(2022, 11, 1),
      };
      const expectedWallet = {
        _id: "507f191e810c19729de860ea",
        user: "507f191e810c19729de860ea",
        value: 0,
        createdAt: new Date(2022, 1, 1),
        updatedAt: new Date(2022, 11, 1),
      };
      UserRepositoryMock.getByEmail.mockReturnValueOnce(Promise.resolve(null));
      UserRepositoryMock.createUser.mockReturnValueOnce(
        Promise.resolve(expectedUser)
      );
      CreateWalletUseCaseMock.execute.mockReturnValueOnce(
        Promise.resolve({ wallet: expectedWallet })
      );
      const useCase = CreateAccountFactory.create();

      const { user, wallet } = await useCase.execute(userToCreate);

      expect(user).toStrictEqual(expectedUser);
      expect(wallet).toStrictEqual(expectedWallet);
      expect(UserRepositoryMock.getByEmail).toBeCalled();
      expect(UserRepositoryMock.createUser).toBeCalled();
      expect(EncryptorServiceMock.encrypt).toBeCalled();
    });
  });
});
