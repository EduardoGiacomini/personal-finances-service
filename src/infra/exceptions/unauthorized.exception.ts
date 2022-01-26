import { Exception } from "@infra/protocol";

export class UnauthorizedException extends Error implements Exception {
  code = "UNAUTHORIZED_EXCEPTION";
  status = 401;
  message = "Unauthorized exception";

  constructor() {
    super("Unauthorized exception");
  }
}
