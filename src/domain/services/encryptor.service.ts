export interface EncryptorService {
  encrypt(password: string): Promise<string>;
}
