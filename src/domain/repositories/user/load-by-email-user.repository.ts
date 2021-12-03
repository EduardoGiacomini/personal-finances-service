import { User } from '../../entities/user';

export interface LoadByEmailUserRepository {
  loadByEmail(email: string): Promise<User>;
}
