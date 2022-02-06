export interface TokenService {
  sign(payload: any, expiresIn: number): Promise<string>;
  verify(token: string): Promise<any>;
}
