import { Exception } from "@domain/protocol";

export class WalletAlreadyExistsException extends Error implements Exception {
  code = "WALLET_ALREADY_EXISTS";
  status = 400;

  constructor() {
    super("The wallet already exists");
  }
}
