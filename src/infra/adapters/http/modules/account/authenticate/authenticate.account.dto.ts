import { AuthenticateInput } from "@domain/usecases/account/authenticate.account.usecase";
import { IsEmail, IsString, MinLength } from "class-validator";
import { User } from "@domain/entities";

export class AuthenticateAccountDTO implements AuthenticateInput {
  @IsEmail()
  email: User["email"];

  @IsString()
  @MinLength(8)
  password: User["password"];
}
