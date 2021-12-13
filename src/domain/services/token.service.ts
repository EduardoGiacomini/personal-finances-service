export interface TokenService {
  sign(id: string): Promise<string>;
}
