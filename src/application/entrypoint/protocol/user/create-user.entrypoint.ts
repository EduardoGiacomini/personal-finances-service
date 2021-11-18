import { User } from '../../../../core/entities/user';

export interface CreateUserEntrypoint {
  create(user: User): Promise<User>;
}
