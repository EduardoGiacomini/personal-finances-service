import { EntityRepository, Repository } from 'typeorm';
import { UserPostgresEntity } from './user.postgres.entity';
import { User } from '../../../../domain/entities';
import {
  CreateUserRepository,
  LoadByEmailUserRepository,
} from '../../../../domain/ports/repositories/user';

@EntityRepository(UserPostgresEntity)
export class UsersPostgresRepository
  extends Repository<UserPostgresEntity>
  implements CreateUserRepository, LoadByEmailUserRepository
{
  async createUser(user: User): Promise<User> {
    const userToCreate = this.create(user);
    await this.save(userToCreate);
    return userToCreate;
  }

  loadByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }
}
