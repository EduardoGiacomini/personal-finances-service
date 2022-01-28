export interface TokenService {
  sign(payload: any, expiresIn: string | number): Promise<string>;
  verify(token: string): Promise<any>;
}
