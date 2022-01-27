import { Route } from "@infra/protocol";
import { Router, Request, Response, NextFunction } from "express";
import { validateDtoMiddleware } from "@infra/adapters/http/middlewares";
import { AuthenticateAccountDTO } from "@infra/adapters/http/modules/account/authenticate/authenticate.account.dto";
import {
  AuthenticateAccountUseCase,
  CreateTokenUseCase,
} from "@domain/usecases/account";
import { AuthenticateAccountController } from "@infra/adapters/http/modules/account/authenticate/authenticate.account.controller";

export class AuthenticateAccountRoute implements Route {
  private readonly route: Router;

  constructor(
    private readonly authenticateAccountUseCase: AuthenticateAccountUseCase,
    private readonly createTokenUseCase: CreateTokenUseCase,
    private readonly accessTokenExpiration: string,
    private readonly refreshTokenExpiration: string
  ) {
    this.route = Router();
    this.route.post(
      "/auth",
      validateDtoMiddleware(AuthenticateAccountDTO),
      (request: Request, response: Response, next: NextFunction) =>
        new AuthenticateAccountController(
          this.authenticateAccountUseCase,
          this.createTokenUseCase,
          this.accessTokenExpiration,
          this.refreshTokenExpiration
        ).execute(request, response, next)
    );
  }

  getRoute(): Router {
    return this.route;
  }
}
