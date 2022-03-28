import { Exception } from "@domain/protocol";

export class UserAlreadyExistsException extends Error implements Exception {
  code = "USER_ALREADY_EXISTS";
  status = 500;

  constructor() {
    super("The user already exists");
  }
}
