import { User } from '../entities/user';

export interface UsersRepository {
  createUser(user: User): Promise<User>;
  findUserById(id: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
}
