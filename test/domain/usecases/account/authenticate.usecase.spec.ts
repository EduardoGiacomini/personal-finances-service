class AuthenticateUseCase {
  async execute() {
    throw new Error('Not implemented yet');
  }
}

class AuthenticateFactory {
  static create(): { authenticateUseCase: AuthenticateUseCase } {
    const authenticateUseCase = new AuthenticateUseCase();
    return { authenticateUseCase };
  }
}

describe('Authenticate use case', () => {
  it('should have and execute method defined', () => {
    const { authenticateUseCase } = AuthenticateFactory.create();

    expect(authenticateUseCase.execute).toBeDefined();
  });
});
