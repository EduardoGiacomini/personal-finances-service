import { UseCase } from "@domain/protocol";
import { EncryptorService, TokenService } from "@domain/ports/services";
import { GetByEmailUserRepository } from "@domain/ports/repositories/user";
import { EmailOrPasswordIncorrectException } from "@domain/exceptions/account";

export class AuthenticateAccountUseCase implements UseCase {
  constructor(
    private readonly getByEmailUserRepository: GetByEmailUserRepository,
    private readonly encryptorService: EncryptorService,
    private readonly tokenService: TokenService,
    private readonly tokenExpiration: string | number
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.getUserByEmail(email);
    this.thrownAnErrorIfUserDoesNotExists(user);
    await this.thrownAnErrorIfUserPasswordDoesNotMatchesWithInputPassword(
      user,
      password
    );
    const token = await this.generateAccessToken(user);
    return { token };
  }

  private async getUserByEmail(email) {
    return this.getByEmailUserRepository.getByEmail(email);
  }

  private thrownAnErrorIfUserDoesNotExists(user) {
    if (!user) {
      throw new EmailOrPasswordIncorrectException();
    }
  }

  private async thrownAnErrorIfUserPasswordDoesNotMatchesWithInputPassword(
    user,
    password
  ) {
    const matchPasswords = await this.encryptorService.compare(
      user.password,
      password
    );
    if (!matchPasswords) {
      throw new EmailOrPasswordIncorrectException();
    }
  }

  private async generateAccessToken(user) {
    return this.tokenService.sign(user.id, this.tokenExpiration);
  }
}

export type AuthenticateInput = {
  email: string;
  password: string;
};

export type AuthenticateOutput = {
  token: string;
};
