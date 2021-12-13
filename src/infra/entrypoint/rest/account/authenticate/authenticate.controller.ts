import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPostgresRepository } from '../../../../repositories';
import {
  BcryptEncryptorService,
  JsonWebTokenTokenService,
} from '../../../../services';
import {
  AuthenticateUseCase,
  AuthenticateOutput,
} from '../../../../../domain/usecases/account/authenticate.usecase';
import { AuthenticateInputDTO } from './authenticate-input.dto';

@Controller('auth')
export class AuthenticateController {
  private readonly authenticateUserCase: AuthenticateUseCase;

  constructor(
    @InjectRepository(UsersPostgresRepository)
    private usersRepository: UsersPostgresRepository,
  ) {
    this.authenticateUserCase = new AuthenticateUseCase(
      new BcryptEncryptorService(),
      new JsonWebTokenTokenService(),
      usersRepository,
    );
  }

  @Post()
  create(
    @Body() accountInput: AuthenticateInputDTO,
  ): Promise<AuthenticateOutput> {
    return this.authenticateUserCase.execute(accountInput);
  }
}
