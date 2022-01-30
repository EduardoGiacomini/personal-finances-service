import { Router } from "express";
import {
  CreateTokenUseCase,
  ValidateTokenUseCase,
} from "@domain/usecases/account";
import { JsonWebTokenTokenService } from "@infra/adapters/services";
import {
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION,
} from "@infra/config/environment";
import { RefreshTokenAccountRoute } from "@infra/adapters/http/modules/account/refresh-token/refresh-token.account.route";
import { GetByIdUserFactory } from "@infra/factories/user";

export class RefreshTokenAccountFactory {
  static create(): Router {
    const tokenService = new JsonWebTokenTokenService(JWT_SECRET);
    const validateTokenUseCase = new ValidateTokenUseCase(tokenService);
    const createTokenUseCase = new CreateTokenUseCase(tokenService);
    const getByIdUserUseCase = GetByIdUserFactory.createUseCase();
    const refreshTokenRoute = new RefreshTokenAccountRoute(
      validateTokenUseCase,
      createTokenUseCase,
      getByIdUserUseCase,
      JWT_ACCESS_TOKEN_EXPIRATION
    );
    return refreshTokenRoute.getRoute();
  }
}
