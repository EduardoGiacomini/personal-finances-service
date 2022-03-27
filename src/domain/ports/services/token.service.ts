import { Token, TokenPayload } from "@domain/entities";

export interface TokenService {
  sign(payload: TokenPayload, expiresIn: number): Promise<Token>;
  verify(token: Token): Promise<TokenPayload>;
}
