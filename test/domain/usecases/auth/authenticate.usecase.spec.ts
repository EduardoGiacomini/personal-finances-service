import { AuthenticateUseCase } from "@domain/usecases/auth";
import { UserRepositoryMock } from "../../mocks/repositories";
import { EncryptorServiceMock, TokenServiceMock } from "../../mocks/services";
import { EmailOrPasswordIncorrectException } from "@domain/exceptions/domain/auth";
import {Scopes} from "@domain/entities";

class AuthenticateFactory {
  static create(
    accessTokenExpiresIn: number,
    refreshTokenExpiresIn: number
  ): AuthenticateUseCase {
    return new AuthenticateUseCase(
      UserRepositoryMock,
      EncryptorServiceMock,
      TokenServiceMock,
      accessTokenExpiresIn,
      refreshTokenExpiresIn
    );
  }
}

describe("Authenticate Use Case", () => {
  const accessTokenExpiresIn = 60;
  const refreshTokenExpiresIn = 120;
  const credentials = {
    email: "john@gmail.com",
    password: "password",
  };

  describe("when a new object is created", () => {
    it("should have an execute method defined", () => {
      const useCase = AuthenticateFactory.create(
        accessTokenExpiresIn,
        refreshTokenExpiresIn
      );

      expect(useCase.execute).toBeDefined();
    });
  });

  describe("when the user does not exist", () => {
    it("should throw EmailOrPasswordIncorrectException", async () => {
      UserRepositoryMock.getByEmail.mockReturnValueOnce(Promise.resolve(null));
      const useCase = AuthenticateFactory.create(
        accessTokenExpiresIn,
        refreshTokenExpiresIn
      );

      await expect(useCase.execute(credentials)).rejects.toThrowError(
        EmailOrPasswordIncorrectException
      );
      expect(UserRepositoryMock.getByEmail).toBeCalled();
      expect(UserRepositoryMock.getByEmail).toBeCalledWith(credentials.email);
    });
  });

  describe("when the password is incorrect", () => {
    it("should thrown EmailOrPasswordIncorrectException", async () => {
      EncryptorServiceMock.compare.mockReturnValueOnce(Promise.resolve(false));
      const useCase = AuthenticateFactory.create(
        accessTokenExpiresIn,
        refreshTokenExpiresIn
      );

      await expect(useCase.execute(credentials)).rejects.toThrowError(
        EmailOrPasswordIncorrectException
      );
      expect(EncryptorServiceMock.compare).toBeCalled();
      expect(EncryptorServiceMock.compare).toBeCalledWith(
        "encrypted",
        "password"
      );
    });
  });

  describe("when the credentials are correct", () => {
    it("should return access token, refresh token, user and expiresIn", async () => {
      const accessTokenScopes = [
        Scopes.UserRead,
        Scopes.UserWrite,
        Scopes.WalletRead,
        Scopes.WalletWrite,
        Scopes.TransactionRead,
        Scopes.TransactionWrite,
      ];
      const refreshTokenScopes = [...accessTokenScopes, Scopes.Offline];
      const useCase = AuthenticateFactory.create(
        accessTokenExpiresIn,
        refreshTokenExpiresIn
      );

      const { accessToken, refreshToken, user, expiresIn } =
        await useCase.execute(credentials);

      expect(accessToken).toBe("header.payload.signature");
      expect(refreshToken).toBe("header.payload.signature");
      expect(user).toStrictEqual(UserRepositoryMock.user);
      expect(expiresIn).toBe(accessTokenExpiresIn);
      expect(TokenServiceMock.sign).toBeCalledTimes(2);
      expect(TokenServiceMock.sign).toHaveBeenCalledWith(
        {
          sub: UserRepositoryMock.user._id,
          scope: [...accessTokenScopes],
        },
        accessTokenExpiresIn
      );
      expect(TokenServiceMock.sign).toHaveBeenCalledWith(
        {
          sub: UserRepositoryMock.user._id,
          scope: [...refreshTokenScopes],
        },
        refreshTokenExpiresIn
      );
    });
  });
});
