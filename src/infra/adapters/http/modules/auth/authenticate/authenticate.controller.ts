import { Controller } from "@infra/protocol";
import { NextFunction, Request, Response } from "express";
import { AuthenticateUseCase } from "@domain/usecases/auth";
import { constants as httpCodes } from "http2";

export class AuthenticateController implements Controller {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { email, password } = request.body;
      const credentials = { email, password };

      const { user, accessToken, refreshToken, expiresIn } =
        await this.authenticateUseCase.execute(credentials);

      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: true,
      });

      return response
        .status(httpCodes.HTTP_STATUS_OK)
        .send({ user, token: accessToken, expiresIn });
    } catch (error) {
      next(error);
    }
  }
}
