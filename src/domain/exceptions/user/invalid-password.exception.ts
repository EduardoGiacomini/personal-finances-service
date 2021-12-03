export class InvalidPasswordException extends Error {
  constructor(message: string) {
    super(message);
  }
}
