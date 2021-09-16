import { EntityRepository, Repository } from 'typeorm';
import { UserPostgresEntity } from './user.postgres.entity';
import { UsersRepository } from '../../../core/data-providers/users.repository';
import { User } from '../../../core/entities/user';

@EntityRepository(UserPostgresEntity)
export class UsersPostgresRepository
  extends Repository<UserPostgresEntity>
  implements UsersRepository
{
  async createUser(user: User): Promise<User> {
    const userToCreate = this.create(user);
    await this.save(userToCreate);
    return userToCreate;
  }

  findUserById(id: string): Promise<User> {
    return this.findOne({ id });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }
}
