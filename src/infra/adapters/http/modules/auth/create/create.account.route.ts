import { Route } from "@infra/protocol";
import { Router, Request, Response, NextFunction } from "express";
import { CreateAccountUseCase } from "@domain/usecases/auth";
import { CreateAccountController } from "@infra/adapters/http/modules/auth/create/create.account.controller";
import { CreateAccountDTO } from "@infra/adapters/http/modules/auth/create/create.account.dto";
import { validateDtoMiddleware } from "@infra/adapters/http/middlewares";

export class CreateAccountRoute implements Route {
  private readonly route: Router;

  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {
    this.route = Router();
    this.route.post(
      "/users",
      validateDtoMiddleware(CreateAccountDTO),
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
