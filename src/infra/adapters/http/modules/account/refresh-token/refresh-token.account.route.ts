import { Route } from "@infra/protocol";
import { Router, Request, Response, NextFunction } from "express";
import {
  CreateTokenUseCase,
  ValidateTokenUseCase,
} from "@domain/usecases/account";
import { RefreshTokenAccountController } from "@infra/adapters/http/modules/account/refresh-token/refresh-token.account.controller";
import { GetByIdUserUseCase } from "@domain/usecases/user";

export class RefreshTokenAccountRoute implements Route {
  private readonly route: Router;

  constructor(
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly createTokenUseCase: CreateTokenUseCase,
    private readonly getByIdUserUseCase: GetByIdUserUseCase,
    private readonly accessTokenExpiration: number
  ) {
    this.route = Router();
    this.route.post(
      "/refresh",
      (request: Request, response: Response, next: NextFunction) =>
        new RefreshTokenAccountController(
          this.validateTokenUseCase,
          this.createTokenUseCase,
          this.getByIdUserUseCase,
          this.accessTokenExpiration
        ).execute(request, response, next)
    );
  }

  getRoute(): Router {
    return this.route;
  }
}
