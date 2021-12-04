import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPostgresRepository } from '../../../../repositories';
import { BcryptEncryptorService } from '../../../../services';
import {
  CreateAccountUseCase,
  AccountOutput,
} from '../../../../../domain/usecases/account/create-account.usecase';
import { AccountInputDTO } from './create-account-input.dto'

@Controller('users')
export class CreateAccountController {
  private readonly createAccountUserCase: CreateAccountUseCase;

  constructor(
    @InjectRepository(UsersPostgresRepository)
    private usersRepository: UsersPostgresRepository,
  ) {
    this.createAccountUserCase = new CreateAccountUseCase(
      new BcryptEncryptorService(),
      usersRepository,
      usersRepository,
    );
  }

  @Post()
  create(@Body() accountInput: AccountInputDTO): Promise<AccountOutput> {
    return this.createAccountUserCase.execute(accountInput);
  }
}
