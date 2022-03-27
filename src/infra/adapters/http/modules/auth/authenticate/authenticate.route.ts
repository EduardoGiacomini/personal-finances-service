import { Route } from "@infra/protocol";
import { Router, Request, Response, NextFunction } from "express";
import { validateDtoMiddleware } from "@infra/adapters/http/middlewares";
import { AuthenticateDto } from "@infra/adapters/http/modules/auth/authenticate/authenticate.dto";
import { AuthenticateUseCase } from "@domain/usecases/auth";
import { AuthenticateController } from "@infra/adapters/http/modules/auth/authenticate/authenticate.controller";

export class AuthenticateRoute implements Route {
  private readonly route: Router;

  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {
    this.route = Router();
    this.route.post(
      "/auth",
      validateDtoMiddleware(AuthenticateDto),
      (request: Request, response: Response, next: NextFunction) =>
        new AuthenticateController(this.authenticateUseCase).execute(
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
