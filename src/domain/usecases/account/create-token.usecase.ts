import { UseCase } from "@domain/protocol";
import { User } from "@domain/entities";
import { TokenService } from "@domain/ports/services";

export class CreateTokenUseCase implements UseCase {
  constructor(private readonly tokenService: TokenService) {}

  async execute({
    _id,
    tokenExpiration,
  }: CreateTokenInput): Promise<CreateTokenOutput> {
    const token = await this.createToken(_id, tokenExpiration);
    return { token };
  }

  private async createToken(_id, tokenExpiration) {
    return await this.tokenService.sign({ _id }, tokenExpiration);
  }
}

export type CreateTokenInput = {
  _id: User["_id"];
  tokenExpiration: string;
};

export type CreateTokenOutput = {
  token: string;
};
