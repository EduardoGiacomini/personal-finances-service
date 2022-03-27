export type Token = string;

export interface TokenPayload {
  sub: string;
  iat?: number;
  scopes: Scopes[];
}

export enum Scopes {
  UserRead = "user:read",
  UserWrite = "user:write",

  WalletRead = "wallet:read",
  WalletWrite = "wallet:read",

  TransactionRead = "transaction:read",
  TransactionWrite = "transaction:read",

  Offline = "offline",
}
