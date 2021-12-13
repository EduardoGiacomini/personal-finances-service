export class EmailOrPasswordInvalidException extends Error {
  code = 'EMAIL_OR_PASSWORD_INVALID_EXCEPTION';

  constructor(message: string) {
    super(message);
  }
}
