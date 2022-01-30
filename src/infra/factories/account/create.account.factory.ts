import { Router } from "express";
import {
  CreateAccountUseCase,
  CreateTokenUseCase,
} from "@domain/usecases/account";
import { UserMongoRepository } from "@infra/adapters/repositories/user";
import {
  BcryptEncryptorService,
  JsonWebTokenTokenService,
} from "@infra/adapters/services";
import { CreateAccountRoute } from "@infra/adapters/http/modules/account/create/create.account.route";
import {
  ENCRYPTOR_SALT,
  JWT_REFRESH_TOKEN_EXPIRATION,
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION,
} from "@infra/config/environment";

export class CreateAccountFactory {
  static create(): Router {
    const userRepository = new UserMongoRepository();
    const encryptorService = new BcryptEncryptorService(ENCRYPTOR_SALT);
    const createAccountUseCase = new CreateAccountUseCase(
      userRepository,
      userRepository,
      encryptorService
    );
    const tokenService = new JsonWebTokenTokenService(JWT_SECRET);
    const createTokenUseCase = new CreateTokenUseCase(tokenService);
    const route = new CreateAccountRoute(
      createAccountUseCase,
      createTokenUseCase,
      JWT_ACCESS_TOKEN_EXPIRATION,
      JWT_REFRESH_TOKEN_EXPIRATION
    );
    return route.getRoute();
  }
}
