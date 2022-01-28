import { Router } from "express";
import { CreateTokenUseCase } from "@domain/usecases/account";
import { JsonWebTokenTokenService } from "@infra/adapters/services";
import { JWT_SECRET, JWT_TOKEN_EXPIRATION } from "@infra/config/environment";
import { RefreshTokenAccountRoute } from "@infra/adapters/http/modules/account/refresh-token/refresh-token.account.route";

export class RefreshTokenAccountFactory {
  static create(): Router {
    const tokenService = new JsonWebTokenTokenService(JWT_SECRET);
    const createTokenUseCase = new CreateTokenUseCase(tokenService);
    const refreshTokenRoute = new RefreshTokenAccountRoute(
      createTokenUseCase,
      JWT_TOKEN_EXPIRATION
    );
    return refreshTokenRoute.getRoute();
  }
}
