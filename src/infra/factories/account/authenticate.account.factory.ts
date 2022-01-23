import { Router } from "express";
import { AuthenticateAccountUseCase } from "@domain/usecases/account";
import { UserMongoRepository } from "@infra/adapters/repositories/user";
import {
  BcryptEncryptorService,
  JsonWebTokenTokenService,
} from "@infra/adapters/services";
import { AuthenticateAccountRoute } from "@infra/adapters/http/modules/account/authenticate/authenticate.account.route";
import {
  ENCRYPTOR_SALT,
  JWT_EXPIRATION_IN_SECONDS,
  JWT_SECRET,
} from "@infra/config/environment";

export class AuthenticateAccountFactory {
  static create(): Router {
    const userRepository = new UserMongoRepository();
    const encryptorService = new BcryptEncryptorService(ENCRYPTOR_SALT);
    const tokenService = new JsonWebTokenTokenService(JWT_SECRET);
    const useCase = new AuthenticateAccountUseCase(
      userRepository,
      encryptorService,
      tokenService,
      JWT_EXPIRATION_IN_SECONDS
    );
    const route = new AuthenticateAccountRoute(useCase);
    return route.getRoute();
  }
}
