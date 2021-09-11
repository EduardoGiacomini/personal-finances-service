import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './data-transfer-objects/create-user.dto';
import { User } from '../../../core/entities/user';
import { CreateUserUseCase } from '../../../core/usecases/user/create-user.usecase';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPostgresRepository } from '../../data-providers/user/users.postgres.repository';

@Controller('users')
export class UserController {
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
