import { EncryptorService } from '../../domain/services';
import { hash, compare } from 'bcrypt';

export class BcryptEncryptorService implements EncryptorService {
  static SALTS = 10;

  encrypt(password: string): Promise<string> {
    return hash(password, BcryptEncryptorService.SALTS);
  }

  compare(encryptedPassword: string, password: string): Promise<boolean> {
    return compare(password, encryptedPassword);
  }
}
