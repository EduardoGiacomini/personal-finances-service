import { TokenService } from "@domain/ports/services";
import { sign, verify } from "jsonwebtoken";

export class JsonWebTokenTokenService implements TokenService {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  sign(payload: any, expiresIn: string | number): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(payload, this.secret, { expiresIn }, (err, encoded) => {
        if (err) {
          return reject(err);
        }

        return resolve(encoded);
      });
    });
  }

  verify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      verify(token, this.secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        return resolve(decoded);
      });
    });
  }
}
