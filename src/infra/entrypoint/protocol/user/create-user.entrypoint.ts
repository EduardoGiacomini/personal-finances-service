import { User } from '../../../../domain/entities/user';

export interface CreateUserEntrypoint {
  create(user: User): Promise<User>;
}
