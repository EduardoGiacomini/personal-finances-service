import { CreateAccountInput } from "@domain/usecases/account/create.account.usecase";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAccountDTO implements CreateAccountInput {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
