import { UseCase } from "@domain/protocol";
import { User } from "@domain/entities";
import {
  CreateUserRepository,
  GetByEmailUserRepository,
} from "@domain/ports/repositories/user";
import { EncryptorService } from "@domain/ports/services";
import { UserAlreadyExistsException } from "@domain/exceptions/user";

export class CreateAccountUseCase implements UseCase {
  constructor(
    private readonly getByEmailUserRepository: GetByEmailUserRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly encryptorService: EncryptorService
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    await this.thrownExceptionIfTheEmailIsAlreadyInUse(email);
    const encryptedPassword = await this.encryptUserPassword(password);
    const user = await this.createUser({
      name,
      email,
      password: encryptedPassword,
    });
    user.password = undefined;
    return { user };
  }

  private async thrownExceptionIfTheEmailIsAlreadyInUse(email) {
    if (await this.getByEmailUserRepository.getByEmail(email)) {
      throw new UserAlreadyExistsException();
    }
  }

  private async encryptUserPassword(password) {
    return this.encryptorService.encrypt(password);
  }

  private async createUser(user) {
    return this.createUserRepository.createUser(user);
  }
}

export type CreateAccountInput = {
  name: string;
  email: string;
  password: string;
};

export type CreateAccountOutput = {
  user: User;
};
