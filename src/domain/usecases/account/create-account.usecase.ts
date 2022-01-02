import { UserAlreadyExistsException } from '../../exceptions/user';
import { EncryptorService } from '../../ports/services';
import {
  LoadByEmailUserRepository,
  CreateUserRepository,
} from '../../ports/repositories/user';

export type AccountInput = {
  name: string;
  email: string;
  password: string;
};

export type AccountOutput = {
  id?: string;
  name: string;
  email: string;
};

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
    const encryptedPassword = await this.encryptUserPassword(password);
    const createdUser = await this.createUser({
      name,
      email,
      password: encryptedPassword,
    });
    delete createdUser.password;
    return createdUser;
  }

  private async checkIfExistsAnUserAccountWithTheSameEmail(email) {
    if (await this.loadByEmailUserRepository.loadByEmail(email)) {
      throw new UserAlreadyExistsException(`The user ${email} already exists`);
    }
  }

  private async encryptUserPassword(password) {
    return this.encryptorService.encrypt(password);
  }

  private async createUser({ name, email, password }) {
    return this.createUserRepository.createUser({
      name,
      email,
      password,
    });
  }
}
