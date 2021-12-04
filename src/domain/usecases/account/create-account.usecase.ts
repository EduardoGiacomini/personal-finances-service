import { EncryptorService } from '../../services';
import { EmailValidator, PasswordValidator } from '../../validators';
import {
  LoadByEmailUserRepository,
  CreateUserRepository,
} from '../../repositories/user';
import {
  InvalidEmailException,
  InvalidPasswordException,
  UserAlreadyExistsException,
} from '../../exceptions/user';

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
    private readonly emailValidator: EmailValidator,
    private readonly passwordValidator: PasswordValidator,
    private readonly encryptorService: EncryptorService,
    private readonly loadByEmailUserRepository: LoadByEmailUserRepository,
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: AccountInput): Promise<AccountOutput> {
    await this.checkIfUserEmailIsValid(email);
    await this.checkIfUserPasswordIsValid(password);
    await this.checkIfExistsAnUserAccountWithTheSameEmail(email);
    const encryptedPassword = await this.encryptTheUserPassword(password);
    const createdUser = await this.createUser(name, email, encryptedPassword);
    delete createdUser.password;
    return createdUser;
  }

  private async checkIfUserEmailIsValid(email: string) {
    if (!(await this.emailValidator.isValid(email))) {
      throw new InvalidEmailException(`The email ${email} is invalid`);
    }
  }

  private async checkIfUserPasswordIsValid(password: string) {
    if (!(await this.passwordValidator.isValid(password))) {
      throw new InvalidPasswordException(`The password ${password} is invalid`);
    }
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
