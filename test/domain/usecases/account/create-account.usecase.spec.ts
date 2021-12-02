interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
}

interface AccountInput {
  name: string;
  email: string;
  password: string;
}

interface EmailValidator {
  isValid(email: string): boolean;
}

interface PasswordValidator {
  isValid(password: string): boolean;
}

interface LoadByEmailUserRepository {
  loadByEmail(email: string): Promise<User>;
}

interface EncryptorService {
  encrypt(password: string): Promise<string>;
}

interface CreateUserRepository {
  create(user: User): Promise<User>;
}

class EmailValidatorStub implements EmailValidator {
  email?: string;
  output = true;
  calls = 0;

  isValid(email: string): boolean {
    this.email = email;
    this.calls += 1;
    return this.output;
  }
}

class PasswordValidatorStub implements PasswordValidator {
  password?: string;
  output = true;
  calls = 0;

  isValid(password: string): boolean {
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
    return this.output;
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

  async create({ name, email, password }: User): Promise<User> {
    this.user = { name, email, password };
    this.calls += 1;
    this.output = { id: this.output.id, name, email, password };
    return this.output;
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

class InvalidEmailException extends Error {
  constructor(message: string) {
    super(message);
  }
}

class InvalidPasswordException extends Error {
  constructor(message: string) {
    super(message);
  }
}

class UserAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
  }
}

class CreateAccountUseCase {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly passwordValidator: PasswordValidator,
    private readonly encryptorService: EncryptorService,
    private readonly loadByEmailUserRepository: LoadByEmailUserRepository,
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  async execute({ name, email, password }: AccountInput): Promise<User> {
    if (!this.emailValidator.isValid(email)) {
      throw new InvalidEmailException(`The email ${email} is invalid`);
    }
    if (!this.passwordValidator.isValid(password)) {
      throw new InvalidPasswordException(`The password ${password} is invalid`);
    }
    if (await this.loadByEmailUserRepository.loadByEmail(email)) {
      throw new UserAlreadyExistsException(`The user ${email} already exists`);
    }
    const encryptedPassword = await this.encryptorService.encrypt(password);
    return this.createUserRepository.create({
      name,
      email,
      password: encryptedPassword,
    });
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
      email: 'invalidPassword',
    });

    await expect(promise).rejects.toThrow(InvalidEmailException);
    expect(emailValidator.email).toBe('invalidPassword');
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
    expect(createdUser).toStrictEqual(createUserRepository.output);
  });
});
