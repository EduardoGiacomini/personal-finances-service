import { Router } from "express";
import { AuthenticateUseCase } from "@domain/usecases/auth";
import { UserMongoRepository } from "@infra/adapters/repositories/user";
import {
  BcryptEncryptorService,
  JsonWebTokenTokenService,
} from "@infra/adapters/services";
import { AuthenticateRoute } from "@infra/adapters/http/modules/auth/authenticate/authenticate.route";
import {
  ENCRYPTOR_SALT,
  JWT_REFRESH_TOKEN_EXPIRATION,
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION,
} from "@infra/config/environment";

export class AuthenticateFactory {
  static create(): Router {
    const userMongoRepository = new UserMongoRepository();

    const bcryptEncryptorService = new BcryptEncryptorService(ENCRYPTOR_SALT);

    const jsonWebTokensTokenService = new JsonWebTokenTokenService(JWT_SECRET);

    const authenticateUseCase = new AuthenticateUseCase(
      userMongoRepository,
      bcryptEncryptorService,
      jsonWebTokensTokenService,
      JWT_ACCESS_TOKEN_EXPIRATION,
      JWT_REFRESH_TOKEN_EXPIRATION
    );

    const route = new AuthenticateRoute(authenticateUseCase);
    return route.getRoute();
  }
}
