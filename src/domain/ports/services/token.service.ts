export interface TokenService {
  sign(payload: any, expiresIn: string | number): string;
  verify(token: string): any;
}
