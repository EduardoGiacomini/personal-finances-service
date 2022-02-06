import { UseCase } from "@domain/protocol";
import { EncryptorService } from "@domain/ports/services";
import { GetByEmailUserRepository } from "@domain/ports/repositories/user";
import { EmailOrPasswordIncorrectException } from "@domain/exceptions/account";
import { User } from "@domain/entities";

export class AuthenticateAccountUseCase implements UseCase {
  constructor(
    private readonly getByEmailUserRepository: GetByEmailUserRepository,
    private readonly encryptorService: EncryptorService
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.getUserByEmail(email);
    this.thrownAnErrorIfUserDoesNotExists(user);
    await this.thrownAnErrorIfUserPasswordDoesNotMatchesWithInputPassword(
      user,
      password
    );
    user.password = undefined;
    return { user };
  }

  private async getUserByEmail(email) {
    return this.getByEmailUserRepository.getByEmail(email);
  }

  private thrownAnErrorIfUserDoesNotExists(user) {
    if (!user) {
      throw new EmailOrPasswordIncorrectException();
    }
  }

  private async thrownAnErrorIfUserPasswordDoesNotMatchesWithInputPassword(
    user,
    password
  ) {
    const matchPasswords = await this.encryptorService.compare(
      user.password,
      password
    );
    if (!matchPasswords) {
      throw new EmailOrPasswordIncorrectException();
    }
  }
}

export type AuthenticateInput = {
  email: User["email"];
  password: User["password"];
};

export type AuthenticateOutput = {
  user: User;
};
