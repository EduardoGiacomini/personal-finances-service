import { LoadByEmailUserRepository } from '../../../../src/domain/repositories/user';
import { User } from '../../../../src/domain/entities';
import { cloneDeep } from 'lodash';

class LoadByEmailUserRepositoryStub implements LoadByEmailUserRepository {
  output: User = {
    id: 'e903a5fb-6354-44da-8439-e90b0a973d8d',
    name: 'Carlos',
    email: 'carloseduardo.diasgiacomini@gmail.com',
    password: 'aB19@fF5gI#4',
  };
  email?: string;
  calls = 0;

  async loadByEmail(email: string): Promise<User> {
    this.email = email;
    this.calls += 1;
    return cloneDeep(this.output);
  }
}

interface EncryptorService {
  compare(encryptedPassword: string, password: string): Promise<boolean>;
}

class EncryptorServiceStub implements EncryptorService {
  output = true;
  encryptedPassword?: string;
  password?: string;
  calls = 0;

  async compare(encryptedPassword: string, password: string): Promise<boolean> {
    this.encryptedPassword = encryptedPassword;
    this.password = password;
    this.calls += 1;
    return this.output;
  }
}

interface TokenService {
  sign(id: string): Promise<string>;
}

class TokenServiceStub implements TokenService {
  output =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ.v6RMksQKb73Fln73fYo6fLw7iFrJ_Bwb7VE9uvxVZSs';
  id?: string;
  calls = 0;

  async sign(id: string): Promise<string> {
    this.id = id;
    this.calls += 1;
    return this.output;
  }
}

class EmailOrPasswordInvalidException extends Error {
  code = 'EMAIL_OR_PASSWORD_INVALID_EXCEPTION';

  constructor(message: string) {
    super(message);
  }
}

export interface AuthenticateInput {
  email: string;
  password: string;
}

interface AuthenticateOutput {
  token: string;
}

class AuthenticateUseCase {
  constructor(
    private readonly encryptorService: EncryptorServiceStub,
    private readonly tokenService: TokenServiceStub,
    private readonly loadByEmailUserRepository: LoadByEmailUserRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.loadByEmailUserRepository.loadByEmail(email);
    if (!user) {
      throw new EmailOrPasswordInvalidException('Email os password invalid');
    }
    const matchPasswords = await this.encryptorService.compare(
      user.password,
      password,
    );
    if (!matchPasswords) {
      throw new EmailOrPasswordInvalidException('Email os password invalid');
    }
    const token = await this.tokenService.sign(user.id);
    return { token };
  }
}

class AuthenticateFactory {
  static create(): {
    encryptorService: EncryptorServiceStub;
    tokenService: TokenServiceStub;
    loadByEmailUserRepository: LoadByEmailUserRepositoryStub;
    authenticateUseCase: AuthenticateUseCase;
  } {
    const encryptorService = new EncryptorServiceStub();
    const tokenService = new TokenServiceStub();
    const loadByEmailUserRepository = new LoadByEmailUserRepositoryStub();
    const authenticateUseCase = new AuthenticateUseCase(
      encryptorService,
      tokenService,
      loadByEmailUserRepository,
    );
    return {
      encryptorService,
      tokenService,
      loadByEmailUserRepository,
      authenticateUseCase,
    };
  }
}

describe('Authenticate use case', () => {
  const email = 'carloseduardo.diasgiacomini@gmail.com';
  const password = '123456';

  it('should have and execute method defined', () => {
    const { authenticateUseCase } = AuthenticateFactory.create();

    expect(authenticateUseCase.execute).toBeDefined();
  });

  it('should return an error when the user does not exist', async () => {
    const { loadByEmailUserRepository, authenticateUseCase } =
      AuthenticateFactory.create();
    loadByEmailUserRepository.output = null;

    const promise = authenticateUseCase.execute({ email, password });

    await expect(promise).rejects.toThrow(EmailOrPasswordInvalidException);
    expect(loadByEmailUserRepository.email).toBe(email);
    expect(loadByEmailUserRepository.calls).toBe(1);
  });

  it('should return an error when the passwords does not matches', async () => {
    const { encryptorService, loadByEmailUserRepository, authenticateUseCase } =
      AuthenticateFactory.create();
    encryptorService.output = false;

    const promise = authenticateUseCase.execute({ email, password });

    await expect(promise).rejects.toThrow(EmailOrPasswordInvalidException);
    expect(encryptorService.encryptedPassword).toBe(
      loadByEmailUserRepository.output.password,
    );
    expect(encryptorService.password).toBe(password);
    expect(encryptorService.calls).toBe(1);
  });

  it('should return an authenticated token when the email and password matches', async () => {
    const { tokenService, loadByEmailUserRepository, authenticateUseCase } =
      AuthenticateFactory.create();

    const { token } = await authenticateUseCase.execute({ email, password });

    expect(token).toBe(tokenService.output);
    expect(tokenService.id).toBe(loadByEmailUserRepository.output.id);
    expect(tokenService.calls).toBe(1);
  });
});
