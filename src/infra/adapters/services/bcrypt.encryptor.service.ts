import { EncryptorService } from "@domain/ports/services";
import { hash, compare } from "bcrypt";

export class BcryptEncryptorService implements EncryptorService {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  encrypt(password: string): Promise<string> {
    return hash(password, this.salt);
  }

  compare(encryptedPassword: string, password: string): Promise<boolean> {
    return compare(password, encryptedPassword);
  }
}
