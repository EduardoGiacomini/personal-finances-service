import { AuthenticateInput } from "@domain/usecases/auth/authenticate.usecase";
import { IsEmail, IsString, MinLength } from "class-validator";
import { User } from "@domain/entities";

export class AuthenticateDto implements AuthenticateInput {
  @IsEmail()
  email: User["email"];

  @IsString()
  @MinLength(8)
  password: User["password"];
}
