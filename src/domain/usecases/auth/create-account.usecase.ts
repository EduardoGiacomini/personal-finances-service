import { UseCase } from "@domain/protocol";
import { User, Wallet } from "@domain/entities";
import {
  CreateUserRepository,
  GetByEmailUserRepository,
} from "@domain/ports/repositories/user";
import { EncryptorService } from "@domain/ports/services";
import { UserAlreadyExistsException } from "@domain/exceptions/domain/user";
import { CreateWalletUseCase } from "@domain/usecases/wallet";

export class CreateAccountUseCase implements UseCase {
  constructor(
    private readonly getByEmailUserRepository: GetByEmailUserRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly encryptorService: EncryptorService,
    private readonly createWalletUseCase: CreateWalletUseCase,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    await this.checkIfTheEmailIsAlreadyInUse(email);

    const encryptedPassword = await this.encryptUserPassword(password);
    let user = await this.createUser({
      name,
      email,
      password: encryptedPassword,
    });
    user = this.hideUserPassword(user);

    const wallet = await this.createNewWallet(user);

    return { user, wallet };
  }

  private async checkIfTheEmailIsAlreadyInUse(email) {
    const user = await this.getByEmailUserRepository.getByEmail(email);
    if (user) throw new UserAlreadyExistsException();
  }

  private async encryptUserPassword(password) {
    return this.encryptorService.encrypt(password);
  }

  private async createUser(user) {
    return this.createUserRepository.createUser(user);
  }

  private hideUserPassword(user) {
    user.password = undefined;
    return user;
  }

  private async createNewWallet(user) {
    const { wallet } = await this.createWalletUseCase.execute({ user });
    return wallet;
  }
}

export type CreateAccountInput = {
  name: User["name"];
  email: User["email"];
  password: User["password"];
};

export type CreateAccountOutput = {
  user: User;
  wallet: Wallet;
};
