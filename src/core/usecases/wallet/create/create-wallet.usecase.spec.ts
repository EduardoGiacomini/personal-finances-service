import { CreateWalletUseCase } from './create-wallet.usecase';
import { NotFoundBusinessException } from '../../../exceptions/not-found.business.exception';
import { UsersRepository } from '../../../data-providers/users.repository';
import { WalletsRepository } from '../../../data-providers/wallets.repository';
import { User } from '../../../entities/user';
import { Wallet } from '../../../entities/wallet';
import { DefaultBusinessException } from '../../../exceptions/default.business.exception';

describe('Create Wallet UseCase', () => {
  let createWalletUseCase: CreateWalletUseCase;
  let usersRepositoryMock: UsersRepository;
  let walletsRepositoryMock: WalletsRepository;

  beforeEach(() => {
    usersRepositoryMock = <UsersRepository>{};
    walletsRepositoryMock = <WalletsRepository>{};
    createWalletUseCase = new CreateWalletUseCase(
      usersRepositoryMock,
      walletsRepositoryMock,
    );
  });

  it('execute method should be defined', () => {
    expect(createWalletUseCase.execute).toBeDefined();
  });

  it('should throw an error when the user does not exist', async () => {
    const userId = '(this user does not exist)';
    usersRepositoryMock.findUserById = jest.fn((id: string) => null);
    walletsRepositoryMock.findWalletByUserId = jest.fn((user: string) => null);

    await expect(() => createWalletUseCase.execute(userId)).rejects.toThrow(
      new NotFoundBusinessException(`The user ${userId} does not exist`),
    );
  });

  it('should throw an error when the user already had a wallet', async () => {
    const userId = '(this user exists)';
    usersRepositoryMock.findUserById = jest.fn(
      (id: string) => <Promise<User>>(<unknown>{ id }),
    );
    walletsRepositoryMock.findWalletByUserId = jest.fn(
      (user: string) => <Promise<Wallet>>(<unknown>{ user }),
    );

    await expect(() => createWalletUseCase.execute(userId)).rejects.toThrow(
      new DefaultBusinessException(`The user ${userId} already has a wallet`),
    );
  });

  it('should create a new wallet when the user exist', async () => {
    const userId = '(this user exists)';
    usersRepositoryMock.findUserById = jest.fn(
      (id: string) => <Promise<User>>(<unknown>{ id }),
    );
    walletsRepositoryMock.findWalletByUserId = jest.fn((user: string) => null);
    walletsRepositoryMock.createWallet = jest.fn(
      (wallet: Wallet) => <Promise<Wallet>>(<unknown>wallet),
    );

    const wallet = await createWalletUseCase.execute(userId);

    expect(wallet).not.toBeNull();
    expect(wallet).not.toBeUndefined();
    expect(wallet.user).toBe(userId);
    expect(wallet.value).toBe(0);
  });
});
