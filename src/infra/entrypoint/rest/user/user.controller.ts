import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './data-transfer-objects/create-user.dto';
import { User } from '../../../../domain/entities/user';
import { CreateUserUseCase } from '../../../../domain/usecases/user/create-user.usecase';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPostgresRepository } from '../../../data-providers/user/users.postgres.repository';
import { CreateUserEntrypoint } from '../../protocol/user/create-user.entrypoint';

@Controller('users')
export class UserController implements CreateUserEntrypoint {
  private readonly createUserUserCase: CreateUserUseCase;

  constructor(
    @InjectRepository(UsersPostgresRepository)
    private usersRepository: UsersPostgresRepository,
  ) {
    this.createUserUserCase = new CreateUserUseCase(usersRepository);
  }

  @Post()
  create(@Body() userToCreate: CreateUserDto): Promise<User> {
    return this.createUserUserCase.execute(userToCreate);
  }
}
