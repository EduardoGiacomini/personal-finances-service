import { Controller } from "@infra/protocol";
import { NextFunction, Request, Response } from "express";
import { AuthenticateAccountUseCase } from "@domain/usecases/account";
import { JWT_EXPIRATION_IN_SECONDS } from "@infra/config/environment";

export class AuthenticateAccountController implements Controller {
  constructor(private readonly useCase: AuthenticateAccountUseCase) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { email, password } = request.body;

      const { token } = await this.useCase.execute({
        email,
        password,
      });

      const [header, payload, signature] = token.split(".");

      const futureExpiration = new Date(
        new Date().getTime() + JWT_EXPIRATION_IN_SECONDS * 1000
      );

      response.cookie("header.payload", header + "." + payload, {
        expires: futureExpiration,
        secure: true,
        sameSite: true,
      });

      response.cookie("signature", signature, {
        secure: true,
        httpOnly: true,
        sameSite: true,
      });

      return response.status(200).send();
    } catch (error: any) {
      next(error);
    }
  }
}
