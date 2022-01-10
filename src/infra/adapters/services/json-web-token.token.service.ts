import { TokenService } from '../../../domain/ports/services';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET, JWT_SHORT_EXPIRES_IN } from '../../config/environment';

export class JsonWebTokenTokenService implements TokenService {
  sign(id: string, expiresIn?: string): string {
    if (expiresIn) {
      return sign({ id }, JWT_SECRET, { expiresIn });
    }
    return sign({ id }, JWT_SECRET, { expiresIn: JWT_SHORT_EXPIRES_IN });
  }
}
