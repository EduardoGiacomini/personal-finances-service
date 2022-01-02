import { User } from '../../../entities/user';

export interface CreateUserRepository {
  createUser(user: User): Promise<User>;
}
