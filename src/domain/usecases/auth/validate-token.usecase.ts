import { UseCase } from "@domain/protocol";
import { TokenService } from "@domain/ports/services";

export class ValidateTokenUseCase implements UseCase {
  constructor(private readonly tokenService: TokenService) {}

  async execute({ token }: ValidateTokenInput): Promise<ValidateTokenOutput> {
    const payload = await this.verifyToken(token);
    return { payload };
  }

  async verifyToken(token) {
    try {
      return this.tokenService.verify(token);
    } catch (err) {
      // FIXME
      throw err;
    }
  }
}

export type ValidateTokenInput = {
  token: string;
};

export type ValidateTokenOutput = {
  payload: any;
};
