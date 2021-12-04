import { UserAlreadyExistsException } from '../../exceptions/user';
import { EncryptorService } from '../../services';
import {
  LoadByEmailUserRepository,
  CreateUserRepository,
} from '../../repositories/user';

export interface AccountInput {
  name: string;
  email: string;
  password: string;
}

export interface AccountOutput {
  id?: string;
  name: string;
  email: string;
}

export class CreateAccountUseCase {
  constructor(
    private readonly encryptorService: EncryptorService,
    private readonly loadByEmailUserRepository: LoadByEmailUserRepository,
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: AccountInput): Promise<AccountOutput> {
    await this.checkIfExistsAnUserAccountWithTheSameEmail(email);
    const encryptedPassword = await this.encryptTheUserPassword(password);
    const createdUser = await this.createUser(name, email, encryptedPassword);
    delete createdUser.password;
    return createdUser;
  }

  private async checkIfExistsAnUserAccountWithTheSameEmail(email: string) {
    if (await this.loadByEmailUserRepository.loadByEmail(email)) {
      throw new UserAlreadyExistsException(`The user ${email} already exists`);
    }
  }

  private async encryptTheUserPassword(password: string) {
    return this.encryptorService.encrypt(password);
  }

  private async createUser(name: string, email: string, password: string) {
    return this.createUserRepository.createUser({
      name,
      email,
      password,
    });
  }
}
