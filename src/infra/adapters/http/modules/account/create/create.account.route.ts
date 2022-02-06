import { Route } from "@infra/protocol";
import { Router, Request, Response, NextFunction } from "express";
import {
  CreateAccountUseCase,
  CreateTokenUseCase,
} from "@domain/usecases/account";
import { CreateAccountController } from "@infra/adapters/http/modules/account/create/create.account.controller";
import { validateDtoMiddleware } from "@infra/adapters/http/middlewares";
import { CreateAccountDTO } from "@infra/adapters/http/modules/account/create/create.account.dto";

export class CreateAccountRoute implements Route {
  private readonly route: Router;

  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly createTokenUseCase: CreateTokenUseCase,
    private readonly accessTokenExpiration: number,
    private readonly refreshTokenExpiration: number
  ) {
    this.route = Router();
    this.route.post(
      "/users",
      validateDtoMiddleware(CreateAccountDTO),
      (request: Request, response: Response, next: NextFunction) =>
        new CreateAccountController(
          this.createAccountUseCase,
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
