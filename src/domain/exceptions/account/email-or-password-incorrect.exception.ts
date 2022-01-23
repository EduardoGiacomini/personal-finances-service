import { Exception } from "@domain/protocol";

export class EmailOrPasswordIncorrectException extends Error implements Exception {
  code: "EMAIL_OR_PASSWORD_INCORRECT";
  status: 400;

  constructor() {
    super("Email or password incorrect");
  }
}
