import { PasswordValidator } from '../../domain/validators';
import { validateOrReject, MinLength } from 'class-validator';

class Password {
  @MinLength(6)
  password: string;
}

export class ClassValidatorPasswordValidator implements PasswordValidator {
  async isValid(password: string): Promise<boolean> {
    try {
      const passwordToVerify = new Password();
      passwordToVerify.password = password;
      await validateOrReject(passwordToVerify);
      return true;
    } catch (errors) {
      return false;
    }
  }
}
