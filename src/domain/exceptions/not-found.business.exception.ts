export class NotFoundBusinessException extends Error {
  constructor(message: string) {
    super(message);
  }
}
