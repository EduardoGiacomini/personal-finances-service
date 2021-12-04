export class InvalidPasswordException extends Error {
  code = 'INVALID_PASSWORD_EXCEPTION';

  constructor(message: string) {
    super(message);
  }
}
