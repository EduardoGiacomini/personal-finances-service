import { Router } from "express";
import {
  AuthenticateAccountUseCase,
  CreateTokenUseCase,
} from "@domain/usecases/account";
import { UserMongoRepository } from "@infra/adapters/repositories/user";
import {
  BcryptEncryptorService,
  JsonWebTokenTokenService,
} from "@infra/adapters/services";
import { AuthenticateAccountRoute } from "@infra/adapters/http/modules/account/authenticate/authenticate.account.route";
import {
  ENCRYPTOR_SALT,
  JWT_REFRESH_TOKEN_EXPIRATION,
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION,
} from "@infra/config/environment";

export class AuthenticateAccountFactory {
  static create(): Router {
    const userRepository = new UserMongoRepository();
    const encryptorService = new BcryptEncryptorService(ENCRYPTOR_SALT);
    const authenticateUseCase = new AuthenticateAccountUseCase(
      userRepository,
      encryptorService
    );
    const tokenService = new JsonWebTokenTokenService(JWT_SECRET);
    const createTokenUseCase = new CreateTokenUseCase(tokenService);
    const route = new AuthenticateAccountRoute(
      authenticateUseCase,
      createTokenUseCase,
      JWT_ACCESS_TOKEN_EXPIRATION,
      JWT_REFRESH_TOKEN_EXPIRATION
    );
    return route.getRoute();
  }
}
