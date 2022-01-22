import { Route } from "@infra/protocol";
import { Router, Request, Response, NextFunction } from "express";
import { CreateAccountUseCase } from "@domain/usecases/account";
import { CreateAccountController } from "@infra/adapters/http/modules/account/create/create.account.controller";
import { validationMiddleware } from "@infra/adapters/http/middlewares";
import { CreateAccountDTO } from "@infra/adapters/http/modules/account/create/create.account.dto";

export class CreateAccountRoute implements Route {
  private readonly route: Router;

  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {
    this.route = Router();
    this.route.post(
      "/users",
      validationMiddleware(CreateAccountDTO),
      (request: Request, response: Response, next: NextFunction) =>
        new CreateAccountController(this.createAccountUseCase).execute(
          request,
          response,
          next
        )
    );
  }

  getRoute(): Router {
    return this.route;
  }
}
