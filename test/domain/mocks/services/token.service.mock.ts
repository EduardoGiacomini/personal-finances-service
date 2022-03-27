import { Scopes } from "@domain/entities";

export const TokenServiceMock = {
  sign: jest.fn().mockReturnValue(Promise.resolve("header.payload.signature")),
  verify: jest.fn().mockReturnValue(
    Promise.resolve({
      sub: "507f1f77bcf86cd799439011",
      scopes: [
        Scopes.UserRead,
        Scopes.UserWrite,
        Scopes.WalletRead,
        Scopes.WalletWrite,
        Scopes.TransactionRead,
        Scopes.TransactionWrite,
      ],
    })
  ),
};
