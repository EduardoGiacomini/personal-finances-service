import { Controller } from "@infra/protocol";
import { NextFunction, Request, Response } from "express";
import {
  CreateAccountUseCase,
  CreateTokenUseCase,
} from "@domain/usecases/account";

export class CreateAccountController implements Controller {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly createTokenUseCase: CreateTokenUseCase,
    private readonly accessTokenExpiration: string,
    private readonly refreshTokenExpiration: string
  ) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const { user } = await this.createAccountUseCase.execute({
        name,
        email,
        password,
      });

      const { _id } = user;

      const { token: accessToken } = this.createTokenUseCase.execute({
        _id,
        tokenExpiration: this.accessTokenExpiration,
      });
      const { token: refreshToken } = this.createTokenUseCase.execute({
        _id,
        tokenExpiration: this.refreshTokenExpiration,
      });

      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: true,
      });

      return response.status(201).send({ user, token: accessToken });
    } catch (error: any) {
      next(error);
    }
  }
}
