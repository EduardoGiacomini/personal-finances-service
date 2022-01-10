import { LoadByEmailUserRepository } from '../../ports/repositories/user';
import { EncryptorService, TokenService } from '../../ports/services';
import { EmailOrPasswordInvalidException } from '../../exceptions/user';

export type AuthenticateInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type AuthenticateOutput = {
  token: string;
};

export class AuthenticateUseCase {
  constructor(
    private readonly encryptorService: EncryptorService,
    private readonly tokenService: TokenService,
    private readonly loadByEmailUserRepository: LoadByEmailUserRepository,
    private readonly longTokenExpiresIn: string,
  ) {}

  async execute({
    email,
    password,
    rememberMe,
  }: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.getUserByEmail(email);
    this.thrownAnErrorIfUserDoesNotExists(user);
    await this.thrownAnErrorIfUserPasswordDoesNotMatchesWithInputPassword(
      user,
      password,
    );
    const token = await this.generateAccessToken(user, rememberMe);
    return { token };
  }

  private async getUserByEmail(email) {
    return this.loadByEmailUserRepository.loadByEmail(email);
  }

  private thrownAnErrorIfUserDoesNotExists(user) {
    if (!user) {
      throw new EmailOrPasswordInvalidException('Email or password invalid');
    }
  }

  private async thrownAnErrorIfUserPasswordDoesNotMatchesWithInputPassword(
    user,
    password,
  ) {
    const matchPasswords = await this.encryptorService.compare(
      user.password,
      password,
    );
    if (!matchPasswords) {
      throw new EmailOrPasswordInvalidException('Email or password invalid');
    }
  }

  private async generateAccessToken(user, shouldIRememberUser) {
    if (shouldIRememberUser) {
      return this.tokenService.sign(user.id, this.longTokenExpiresIn);
    }
    return this.tokenService.sign(user.id);
  }
}
