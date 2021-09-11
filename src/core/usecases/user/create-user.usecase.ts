import { UsersRepository } from '../../data-providers/users.repository';
import { User } from '../../entities/user';
import { DefaultBusinessException } from '../../exceptions/default-business.exception';

export class CreateUserUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(user: User): Promise<User> {
    const found = await this.repository.findUserByEmail(user.email);

    if (found) {
      throw new DefaultBusinessException(
        `The user ${user.email} already exists`,
      );
    }

    return this.repository.createUser(user);
  }
}
