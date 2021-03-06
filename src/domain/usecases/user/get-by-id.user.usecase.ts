import { UseCase } from "@domain/protocol";
import { User } from "@domain/entities";
import { UserDoesNotExistException } from "@domain/exceptions/domain/user";
import { GetByIdUserRepository } from "@domain/ports/repositories/user";

export class GetByIdUserUseCase implements UseCase {
  constructor(private readonly getByIdUserRepository: GetByIdUserRepository) {}

  async execute({ _id }: GetByIdUserInput): Promise<GetByIdUserOutput> {
    const user = await this.getUserById(_id);
    this.throwAnErrorIfUserDoesNotExist(user);
    user.password = undefined;
    return { user };
  }

  private async getUserById(_id) {
    return this.getByIdUserRepository.getById(_id);
  }

  private throwAnErrorIfUserDoesNotExist(user) {
    if (!user) {
      throw new UserDoesNotExistException();
    }
  }
}

export type GetByIdUserInput = {
  _id: User["_id"];
};

export type GetByIdUserOutput = {
  user: User;
};
