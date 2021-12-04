import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPostgresRepository } from '../../../repositories';
import { BcryptEncryptorService } from '../../../services';
import {
  ClassValidatorEmailValidator,
  ClassValidatorPasswordValidator,
} from '../../../validators';
import {
  CreateAccountUseCase,
  AccountInput,
  AccountOutput,
} from '../../../../domain/usecases/account/create-account.usecase';

@Controller('users')
export class AccountController {
  private readonly createAccountUserCase: CreateAccountUseCase;

  constructor(
    @InjectRepository(UsersPostgresRepository)
    private usersRepository: UsersPostgresRepository,
  ) {
    this.createAccountUserCase = new CreateAccountUseCase(
      new ClassValidatorEmailValidator(),
      new ClassValidatorPasswordValidator(),
      new BcryptEncryptorService(),
      usersRepository,
      usersRepository,
    );
  }

  @Post()
  create(@Body() accountInput: AccountInput): Promise<AccountOutput> {
    return this.createAccountUserCase.execute(accountInput);
  }
}
