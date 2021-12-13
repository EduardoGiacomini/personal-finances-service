import { AuthenticateInput } from '../../../../../domain/usecases/account/authenticate.usecase';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthenticateInputDTO implements AuthenticateInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
