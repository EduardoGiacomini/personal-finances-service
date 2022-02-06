import { Controller } from "@infra/protocol";
import { NextFunction, Request, Response } from "express";
import {
  CreateTokenUseCase,
  ValidateTokenUseCase,
} from "@domain/usecases/account";
import { GetByIdUserUseCase } from "@domain/usecases/user";
import { UnauthorizedException } from "@infra/exceptions";

export class RefreshTokenAccountController implements Controller {
  constructor(
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly createTokenUseCase: CreateTokenUseCase,
    private readonly getUserByIdUseCase: GetByIdUserUseCase,
    private readonly accessTokenExpiration: number
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

      const { payload } = await this.validateTokenUseCase.execute({
        token: refreshToken,
      });

      const { user } = await this.getUserByIdUseCase.execute({
        _id: payload._id,
      });

      const { token } = await this.createTokenUseCase.execute({
        _id: payload._id,
        tokenExpiration: this.accessTokenExpiration,
      });

      return response.status(200).send({
        user,
        token,
        expiresIn: this.accessTokenExpiration,
      });
    } catch (error: any) {
      next(error);
    }
  }
}
