import { UseCase } from "@domain/protocol";
import { Scopes, Token, User } from "@domain/entities";
import { EncryptorService, TokenService } from "@domain/ports/services";
import { GetByEmailUserRepository } from "@domain/ports/repositories/user";
import { EmailOrPasswordIncorrectException } from "@domain/exceptions/domain/auth";

export class AuthenticateUseCase implements UseCase {
  constructor(
    private readonly getByEmailUserRepository: GetByEmailUserRepository,
    private readonly encryptorService: EncryptorService,
    private readonly tokenService: TokenService,
    private readonly accessTokenExpiresIn: number,
    private readonly refreshTokenExpiresIn: number
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateInput): Promise<AuthenticateOutput> {
    let user = await this.getUserByEmail(email);

    this.checkIfUserExists(user);
    await this.checkIfPasswordMatches(user, password);

    user = this.hideUserPassword(user);
    return this.createAccessTokens(user);
  }

  private async getUserByEmail(email) {
    return this.getByEmailUserRepository.getByEmail(email);
  }

  private checkIfUserExists(user) {
    if (!user) {
      throw new EmailOrPasswordIncorrectException();
    }
  }

  private async checkIfPasswordMatches(user, password) {
    const matchPasswords = await this.encryptorService.compare(
      user.password,
      password
    );
    if (!matchPasswords) {
      throw new EmailOrPasswordIncorrectException();
    }
  }

  private hideUserPassword(user) {
    user.password = undefined;
    return user;
  }

  private async createAccessTokens(user) {
    const basicScopes = [
      Scopes.UserRead,
      Scopes.UserWrite,
      Scopes.WalletRead,
      Scopes.WalletWrite,
      Scopes.TransactionRead,
      Scopes.TransactionWrite,
    ];

    const accessTokenPayload = {
      sub: user._id,
      scope: [...basicScopes],
    };
    const accessToken = await this.createToken(
      accessTokenPayload,
      this.accessTokenExpiresIn
    );

    const refreshTokenPayload = {
      sub: user._id,
      scope: [...basicScopes, Scopes.Offline],
    };
    const refreshToken = await this.createToken(
      refreshTokenPayload,
      this.refreshTokenExpiresIn
    );

    return {
      accessToken,
      refreshToken,
      user,
      expiresIn: this.accessTokenExpiresIn,
    };
  }

  private createToken(payload, expiresIn) {
    return this.tokenService.sign(payload, expiresIn);
  }
}

export type AuthenticateInput = {
  email: User["email"];
  password: User["password"];
};

export type AuthenticateOutput = {
  accessToken: Token;
  refreshToken: Token;
  user: User;
  expiresIn: number;
};
