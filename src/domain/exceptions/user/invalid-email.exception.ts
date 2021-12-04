export class InvalidEmailException extends Error {
  code = 'INVALID_EMAIL_EXCEPTION';

  constructor(message: string) {
    super(message);
  }
}
