import { CreateUserUseCase } from './create-user.usecase';
import { UsersRepository } from '../../data-providers/users.repository';

describe('Create User UseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    const repository = <UsersRepository>{};
    createUserUseCase = new CreateUserUseCase(repository);
  });

  it('execute method should be defined', () => {
    expect(createUserUseCase.execute).toBeDefined();
  });
});
