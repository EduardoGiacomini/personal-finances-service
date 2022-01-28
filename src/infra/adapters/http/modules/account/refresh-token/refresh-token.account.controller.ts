import { Controller } from "@infra/protocol";
import { NextFunction, Request, Response } from "express";
import { CreateTokenUseCase } from "@domain/usecases/account";
import { UnauthorizedException } from "@infra/exceptions";

export class RefreshTokenAccountController implements Controller {
  constructor(
    private readonly createTokenUseCase: CreateTokenUseCase,
    private readonly accessTokenExpiration: string
  ) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { refreshToken } = request.cookies;

      if (!refreshToken) {
        next(new UnauthorizedException());
        return;
      }

      // TODO: check if token is valid
      // TODO: if token is valid, should create a new access token and return it

      return response.status(400).send();
    } catch (error: any) {
      next(error);
    }
  }
}
