interface AccountInput {
  name: string;
  email: string;
  password: string;
}

class InvalidEmail extends Error {
  constructor(message: string) {
    super(message);
  }
}

class InvalidPassword extends Error {
  constructor(message: string) {
    super(message);
  }
}

class CreateAccountUseCase {
  async execute({ name, email, password }: AccountInput) {
    throw new InvalidEmail(`The email ${email} is invalid`);
  }
}

class CreateAccountFactory {
  static create() {
    return new CreateAccountUseCase();
  }
}

describe('Create account use case', () => {
  const name = 'Carlos';
  const email = 'carloseduardo.diasgiacomini@gmail.com';
  const password = '123456';

  it('should have and execute method defined', () => {
    const createAccount = CreateAccountFactory.create();

    expect(createAccount.execute).toBeDefined();
  });

  it('should throw an error when the email is invalid', async () => {
    const createAccount = CreateAccountFactory.create();

    const promise = createAccount.execute({ name, email, password });

    await expect(promise).rejects.toThrow(InvalidEmail);
  });

  it('should throw an error when the password is invalid', async () => {
    const createAccount = CreateAccountFactory.create();

    const promise = createAccount.execute({ name, email, password });

    await expect(promise).rejects.toThrow(InvalidPassword);
  });
});
