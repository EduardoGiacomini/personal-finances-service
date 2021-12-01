import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../../../../domain/entities/user';

export class CreateUserDto implements User {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}
