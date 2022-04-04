import { UserRepositoryMock } from "./user.repository.mock";

const wallet = {
  _id: "507f191e810c19729de860ea",
  user: UserRepositoryMock.user,
  value: 0.0,
  createdAt: new Date(2022, 1, 1),
  updatedAt: new Date(2022, 11, 1),
};

export const WalletRepositoryMock = {
  wallet,
  createWallet: jest.fn().mockReturnValue(Promise.resolve(wallet)),
  getByUser: jest.fn().mockReturnValue(Promise.resolve(null)),
};
