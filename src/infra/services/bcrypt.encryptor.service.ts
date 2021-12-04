import { EncryptorService } from '../../domain/services';
import { hash } from 'bcrypt';

export class BcryptEncryptorService implements EncryptorService {
  static SALTS = 10;

  encrypt(password: string): Promise<string> {
    return hash(password, BcryptEncryptorService.SALTS);
  }
}
