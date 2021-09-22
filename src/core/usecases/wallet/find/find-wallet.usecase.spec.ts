import { FindWalletUseCase } from './find-wallet.usecase';

describe('Find Wallet UseCase', () => {
  let findWalletUseCase: FindWalletUseCase;

  beforeEach(() => {
    findWalletUseCase = new FindWalletUseCase();
  });

  it('execute method should be defined', () => {
    expect(findWalletUseCase.execute).toBeDefined();
  });
});
