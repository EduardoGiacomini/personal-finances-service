import { EmailValidator } from '../../domain/validators';
import { validateOrReject, IsEmail } from 'class-validator';

class Email {
  @IsEmail()
  email: string;
}

export class ClassValidatorEmailValidator implements EmailValidator {
  async isValid(email: string): Promise<boolean> {
    try {
      const emailToVerify = new Email();
      emailToVerify.email = email;
      await validateOrReject(emailToVerify);
      return true;
    } catch (errors) {
      return false;
    }
  }
}
