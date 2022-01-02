import { LoadByEmailUserRepository } from '../../ports/repositories/user';
import { EncryptorService, TokenService } from '../../ports/services';
import { EmailOrPasswordInvalidException } from '../../exceptions/user';

export type AuthenticateInput = {
  email: string;
  password: string;
};

export type AuthenticateOutput = {
  token: string;
};

export class AuthenticateUseCase {
  constructor(
    private readonly encryptorService: EncryptorService,
    private readonly tokenService: TokenService,
    private readonly loadByEmailUserRepository: LoadByEmailUserRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.getUserByEmail(email);
    this.checkIfUserExists(user);
    await this.checkIfUserPasswordMatchesWithInputPassword(user, password);
    const token = await this.generateAccessToken(user);
    return { token };
  }

  private async getUserByEmail(email) {
    return this.loadByEmailUserRepository.loadByEmail(email);
  }

  private checkIfUserExists(user) {
    if (!user) {
      throw new EmailOrPasswordInvalidException('Email or password invalid');
    }
  }

  private async checkIfUserPasswordMatchesWithInputPassword(user, password) {
    const matchPasswords = await this.encryptorService.compare(
      user.password,
      password,
    );
    if (!matchPasswords) {
      throw new EmailOrPasswordInvalidException('Email or password invalid');
    }
  }

  private async generateAccessToken(user) {
    return this.tokenService.sign(user.id);
  }
}
