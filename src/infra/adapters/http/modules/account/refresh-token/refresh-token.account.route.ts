import { Route } from "@infra/protocol";
import { Router, Request, Response, NextFunction } from "express";
import { CreateTokenUseCase } from "@domain/usecases/account";
import { RefreshTokenAccountController } from "@infra/adapters/http/modules/account/refresh-token/refresh-token.account.controller";

export class RefreshTokenAccountRoute implements Route {
  private readonly route: Router;

  constructor(
    private readonly createTokenUseCase: CreateTokenUseCase,
    private readonly accessTokenExpiration: string
  ) {
    this.route = Router();
    this.route.post(
      "/refresh",
      (request: Request, response: Response, next: NextFunction) =>
        new RefreshTokenAccountController(
          this.createTokenUseCase,
          this.accessTokenExpiration
        ).execute(request, response, next)
    );
  }

  getRoute(): Router {
    return this.route;
  }
}
