import { AuthenticateInput } from "@domain/usecases/account/authenticate.account.usecase";
import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthenticateAccountDTO implements AuthenticateInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
