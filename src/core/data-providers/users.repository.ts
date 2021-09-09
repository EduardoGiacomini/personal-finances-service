import { User } from '../entities/user';

export interface UsersRepository {
  createUser(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
}
