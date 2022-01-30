import { GetByIdUserUseCase } from "@domain/usecases/user";
import { UserMongoRepository } from "@infra/adapters/repositories/user";

export class GetByIdUserFactory {
  static createUseCase(): GetByIdUserUseCase {
    const userRepository = new UserMongoRepository();
    return new GetByIdUserUseCase(userRepository);
  }
}
