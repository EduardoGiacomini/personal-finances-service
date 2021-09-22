import { FindWalletUseCase } from './find-wallet.usecase';
import { NotFoundBusinessException } from '../../../exceptions/not-found.business.exception';
import { WalletsRepository } from '../../../data-providers/wallets.repository';
import { Wallet } from '../../../entities/wallet';

describe('Find Wallet UseCase', () => {
  let findWalletUseCase: FindWalletUseCase;
  let walletsRepositoryMock: WalletsRepository;

  beforeEach(() => {
    walletsRepositoryMock = <WalletsRepository>{};
    findWalletUseCase = new FindWalletUseCase(walletsRepositoryMock);
  });

  it('execute method should be defined', () => {
    expect(findWalletUseCase.execute).toBeDefined();
  });

  it('should throw an error when the user wallet does not exist', async () => {
    const userId = '(this user does not exist)';
    walletsRepositoryMock.findWalletByUserId = jest.fn((user: string) => null);

    await expect(() => findWalletUseCase.execute(userId)).rejects.toThrow(
      new NotFoundBusinessException(
        `The wallet from user ${userId} does not exist`,
      ),
    );
  });

  it('should return the user wallet when it exists', async () => {
    const userId = '(this user exists)';
    const walletBalance = 10;
    walletsRepositoryMock.findWalletByUserId = jest.fn(
      (user: string) =>
        <Promise<Wallet>>(<unknown>{ user, value: walletBalance }),
    );

    const wallet = await findWalletUseCase.execute(userId);

    expect(wallet.user).toBe(userId);
    expect(wallet.value).toBe(walletBalance);
  });
});
