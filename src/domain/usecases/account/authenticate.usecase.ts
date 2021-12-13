import { LoadByEmailUserRepository } from '../../repositories/user';
import { EncryptorService, TokenService } from '../../services';
import { EmailOrPasswordInvalidException } from '../../exceptions/user';

export interface AuthenticateInput {
  email: string;
  password: string;
}

export interface AuthenticateOutput {
  token: string;
}

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
    const user = await this.loadByEmailUserRepository.loadByEmail(email);
    if (!user) {
      throw new EmailOrPasswordInvalidException('Email or password invalid');
    }
    const matchPasswords = await this.encryptorService.compare(
      user.password,
      password,
    );
    if (!matchPasswords) {
      throw new EmailOrPasswordInvalidException('Email or password invalid');
    }
    const token = await this.tokenService.sign(user.id);
    return { token };
  }
}
