import { AuthenticateInput } from '../../../../../domain/usecases/account/authenticate.usecase';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthenticateInputDTO implements AuthenticateInput {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsBoolean()
  rememberMe: boolean;
}
