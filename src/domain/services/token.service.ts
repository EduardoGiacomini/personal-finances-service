export interface TokenService {
  sign(id: string, expiresIn?: string): string;
}
