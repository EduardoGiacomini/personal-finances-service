export interface EncryptorService {
  encrypt(password: string): Promise<string>;
  compare(encryptedPassword: string, password: string): Promise<boolean>;
}
