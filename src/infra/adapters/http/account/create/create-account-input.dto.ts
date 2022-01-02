import { AccountInput } from '../../../../../domain/usecases/account/create-account.usecase';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AccountInputDTO implements AccountInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
