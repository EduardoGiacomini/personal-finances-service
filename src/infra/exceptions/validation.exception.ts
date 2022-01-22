import { Exception } from "@infra/protocol";

export class ValidationException extends Error implements Exception {
  code = "VALIDATION_EXCEPTION";
  status = 400;
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
