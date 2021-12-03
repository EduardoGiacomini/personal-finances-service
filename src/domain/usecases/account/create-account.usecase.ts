import { EmailValidator } from '../../validators/email.validator';
import { PasswordValidator } from '../../validators/password.validator';
import { LoadByEmailUserRepository } from '../../repositories/user/load-by-email-user.repository';
import { CreateUserRepository } from '../../repositories/user/create-user.repository';
import { EncryptorService } from '../../services/excryptor.service';
import { InvalidEmailException } from '../../exceptions/user/invalid-email.exception';
import { InvalidPasswordException } from '../../exceptions/user/invalid-password.exception';
import { UserAlreadyExistsException } from '../../exceptions/user/user-already-exists.exception';

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
    this.checkIfUserEmailIsValid(email);
    this.checkIfUserPasswordIsValid(password);
    await this.checkIfExistsAnUserAccountWithTheSameEmail(email);
    const encryptedPassword = await this.encryptTheUserPassword(password);
    const createdUser = await this.createUser(name, email, encryptedPassword);
    delete createdUser.password;
    return createdUser;
  }

  private checkIfUserEmailIsValid(email: string) {
    if (!this.emailValidator.isValid(email)) {
      throw new InvalidEmailException(`The email ${email} is invalid`);
    }
  }

  private checkIfUserPasswordIsValid(password: string) {
    if (!this.passwordValidator.isValid(password)) {
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
    return this.createUserRepository.create({
      name,
      email,
      password,
    });
  }
}
