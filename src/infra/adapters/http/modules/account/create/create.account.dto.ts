import { CreateAccountInput } from "@domain/usecases/account/create.account.usecase";
import { IsEmail, IsString, MinLength } from "class-validator";
import { User } from "@domain/entities";

export class CreateAccountDTO implements CreateAccountInput {
  @IsString()
  name: User["name"];

  @IsEmail()
  email: User["email"];

  @IsString()
  @MinLength(8)
  password: User["password"];
}
