import { TokenService } from '../../domain/services';
import { sign } from 'jsonwebtoken';

export class JsonWebTokenTokenService implements TokenService {
  SECRET = process.env.JWT_SECRET;
  EXPIRES_IN = '12h';

  sign(id: string, expiresIn?: string): string {
    if (expiresIn) {
      return sign({ id }, this.SECRET, { expiresIn });
    }
    return sign({ id }, this.SECRET, { expiresIn: this.EXPIRES_IN });
  }
}
