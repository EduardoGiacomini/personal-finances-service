export interface TokenService {
  sign(payload: any, expiresIn: string | number): string;
}
