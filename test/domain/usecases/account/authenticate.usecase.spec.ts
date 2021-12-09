import { LoadByEmailUserRepository } from '../../../../src/domain/repositories/user';
import { User } from '../../../../src/domain/entities';
import { cloneDeep } from 'lodash';

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

class AuthenticateUseCase {
  constructor(
    private readonly loadByEmailUserRepository: LoadByEmailUserRepository,
  ) {}

  async execute({ email, password }: AuthenticateInput) {
    await this.loadByEmailUserRepository.loadByEmail(email);
    throw new EmailOrPasswordInvalidException('Email os password invalid');
  }
}

class AuthenticateFactory {
  static create(): {
    loadByEmailUserRepository: LoadByEmailUserRepositoryStub;
    authenticateUseCase: AuthenticateUseCase;
  } {
    const loadByEmailUserRepository = new LoadByEmailUserRepositoryStub();
    const authenticateUseCase = new AuthenticateUseCase(
      loadByEmailUserRepository,
    );
    return { loadByEmailUserRepository, authenticateUseCase };
  }
}

describe('Authenticate use case', () => {
  const name = 'Carlos';
  const email = 'carloseduardo.diasgiacomini@gmail.com';
  const password = '123456';

  it('should have and execute method defined', () => {
    const { authenticateUseCase } = AuthenticateFactory.create();

    expect(authenticateUseCase.execute).toBeDefined();
  });

  it('should return an error when the user does not exist', async () => {
    const { authenticateUseCase, loadByEmailUserRepository } =
      AuthenticateFactory.create();
    loadByEmailUserRepository.output = { name, email, password };

    const promise = authenticateUseCase.execute({ email, password });

    await expect(promise).rejects.toThrow(EmailOrPasswordInvalidException);
    expect(loadByEmailUserRepository.email).toBe(email);
    expect(loadByEmailUserRepository.calls).toBe(1);
  });
});
