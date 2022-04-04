import { WalletRepositoryMock } from "../repositories";

const wallet = WalletRepositoryMock.wallet;

export const CreateWalletUseCaseMock = {
  wallet,
  execute: jest.fn().mockReturnValue(Promise.resolve({ wallet })),
};
