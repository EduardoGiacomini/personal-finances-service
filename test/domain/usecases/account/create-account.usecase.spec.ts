import { cloneDeep } from 'lodash';
import { User } from '../../../../src/domain/entities';
import { CreateAccountUseCase } from '../../../../src/domain/usecases/account/create-account.usecase';
import { EncryptorService } from '../../../../src/domain/services';
import {
  EmailValidator,
  PasswordValidator,
} from '../../../../src/domain/validators';
import {
  CreateUserRepository,
  LoadByEmailUserRepository,
} from '../../../../src/domain/repositories/user';
import {
  InvalidEmailException,
  InvalidPasswordException,
  UserAlreadyExistsException,
} from '../../../../src/domain/exceptions/user';

class EmailValidatorStub implements EmailValidator {
  email?: string;
  output = true;
  calls = 0;

  async isValid(email: string): Promise<boolean> {
    this.email = email;
    this.calls += 1;
    return this.output;
  }
}

class PasswordValidatorStub implements PasswordValidator {
  password?: string;
  output = true;
  calls = 0;

  async isValid(password: string): Promise<boolean> {
    this.password = password;
    this.calls += 1;
    return this.output;
  }
}

class LoadByEmailUserRepositoryStub implements LoadByEmailUserRepository {
  output: User = null;
  email?: string;
  calls = 0;

  async loadByEmail(email: string): Promise<User> {
    this.email = email;
    this.calls += 1;
    return cloneDeep(this.output);
  }
}

class CreateUserRepositoryStub implements CreateUserRepository {
  output: User = {
    id: 'e903a5fb-6354-44da-8439-e90b0a973d8d',
    name: null,
    email: null,
    password: null,
  };
  user?: User;
  calls = 0;

  async createUser({ name, email, password }: User): Promise<User> {
    this.user = { name, email, password };
    this.calls += 1;
    this.output = { id: this.output.id, name, email, password };
    return cloneDeep(this.output);
  }
}

class EncryptorServiceStub implements EncryptorService {
  output = 'aB19@fF5gI#4';
  password?: string;
  calls = 0;

  async encrypt(password: string): Promise<string> {
    this.password = password;
    this.calls += 1;
    return this.output;
  }
}

class CreateAccountFactory {
  static create(): {
    createAccountUseCase: CreateAccountUseCase;
    emailValidator: EmailValidatorStub;
    passwordValidator: PasswordValidatorStub;
    encryptorService: EncryptorServiceStub;
    loadByEmailUserRepository: LoadByEmailUserRepositoryStub;
    createUserRepository: CreateUserRepositoryStub;
  } {
    const emailValidator = new EmailValidatorStub();
    const passwordValidator = new PasswordValidatorStub();
    const encryptorService = new EncryptorServiceStub();
    const loadByEmailUserRepository = new LoadByEmailUserRepositoryStub();
    const createUserRepository = new CreateUserRepositoryStub();
    const createAccountUseCase = new CreateAccountUseCase(
      emailValidator,
      passwordValidator,
      encryptorService,
      loadByEmailUserRepository,
      createUserRepository,
    );
    return {
      createAccountUseCase,
      emailValidator,
      encryptorService,
      passwordValidator,
      loadByEmailUserRepository,
      createUserRepository,
    };
  }
}

describe('Create account use case', () => {
  const name = 'Carlos';
  const email = 'carloseduardo.diasgiacomini@gmail.com';
  const password = '123456';

  it('should have and execute method defined', () => {
    const { createAccountUseCase } = CreateAccountFactory.create();

    expect(createAccountUseCase.execute).toBeDefined();
  });

  it('should throw an error when the email is invalid', async () => {
    const { createAccountUseCase, emailValidator } =
      CreateAccountFactory.create();
    emailValidator.output = false;

    const promise = createAccountUseCase.execute({
      name,
      password,
      email: 'invalidEmail',
    });

    await expect(promise).rejects.toThrow(InvalidEmailException);
    expect(emailValidator.email).toBe('invalidEmail');
    expect(emailValidator.calls).toBe(1);
  });

  it('should throw an error when the password is invalid', async () => {
    const { createAccountUseCase, passwordValidator } =
      CreateAccountFactory.create();
    passwordValidator.output = false;

    const promise = createAccountUseCase.execute({
      name,
      email,
      password: '12345',
    });

    await expect(promise).rejects.toThrow(InvalidPasswordException);
    expect(passwordValidator.password).toBe('12345');
    expect(passwordValidator.calls).toBe(1);
  });

  it('should throw an error when the user already exists', async () => {
    const { createAccountUseCase, loadByEmailUserRepository } =
      CreateAccountFactory.create();
    loadByEmailUserRepository.output = { name, email, password };

    const promise = createAccountUseCase.execute({ name, email, password });

    await expect(promise).rejects.toThrow(UserAlreadyExistsException);
    expect(loadByEmailUserRepository.email).toBe(email);
    expect(loadByEmailUserRepository.calls).toBe(1);
  });

  it('should encrypt the user password and should register user', async () => {
    const { createAccountUseCase, encryptorService, createUserRepository } =
      CreateAccountFactory.create();

    const createdUser = await createAccountUseCase.execute({
      name,
      email,
      password,
    });

    expect(encryptorService.password).toBe(password);
    expect(encryptorService.calls).toBe(1);
    expect(createUserRepository.user.password).toBe(encryptorService.output);

    expect(createUserRepository.user.name).toBe(name);
    expect(createUserRepository.user.email).toBe(email);
    expect(createUserRepository.calls).toBe(1);
    expect(createdUser.id).toStrictEqual(createUserRepository.output.id);
    expect(createdUser.name).toStrictEqual(createUserRepository.output.name);
    expect(createdUser.email).toStrictEqual(createUserRepository.output.email);
  });
});
