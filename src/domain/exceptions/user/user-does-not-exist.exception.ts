import { Exception } from "@domain/protocol";

export class UserDoesNotExistException extends Error implements Exception {
  code = "USER_DOES_NOT_EXIST";
  status = 404;

  constructor() {
    super("The user does not exist");
  }
}
