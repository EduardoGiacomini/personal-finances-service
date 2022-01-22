import { Controller } from "@infra/protocol";
import { NextFunction, Request, Response } from "express";
import { CreateAccountUseCase } from "@domain/usecases/account";

export class CreateAccountController implements Controller {
  constructor(private readonly useCase: CreateAccountUseCase) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const { user } = await this.useCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).send(user);
    } catch (error: any) {
      next(error);
    }
  }
}
