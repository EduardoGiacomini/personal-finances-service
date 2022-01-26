import { TokenService } from "@domain/ports/services";
import { sign, verify } from "jsonwebtoken";

export class JsonWebTokenTokenService implements TokenService {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  sign(id: string, expiresIn: string | number): string {
    return sign({ id }, this.secret, { expiresIn });
  }

  verify(token: string): any {
    try {
      return verify(token, this.secret);
    } catch (error) {
      return null;
    }
  }
}
