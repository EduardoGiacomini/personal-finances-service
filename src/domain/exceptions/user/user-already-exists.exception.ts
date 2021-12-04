export class UserAlreadyExistsException extends Error {
  code = 'USER_ALREADY_EXISTS_EXCEPTION';

  constructor(message: string) {
    super(message);
  }
}
