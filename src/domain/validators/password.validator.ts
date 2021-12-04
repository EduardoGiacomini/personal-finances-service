export interface PasswordValidator {
  isValid(password: string): Promise<boolean>;
}
