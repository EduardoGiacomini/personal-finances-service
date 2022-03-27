import { Controller } from "@infra/protocol";
import { NextFunction, Request, Response } from "express";
import { CreateAccountUseCase } from "@domain/usecases/auth";
import { constants as httpCodes } from "http2";

export class CreateAccountController implements Controller {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const userToCreate = { name, email, password };

      const { user } = await this.createAccountUseCase.execute(userToCreate);

      return response.status(httpCodes.HTTP_STATUS_CREATED).send(user);
    } catch (error: any) {
      next(error);
    }
  }
}
