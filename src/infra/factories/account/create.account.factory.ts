import { Router } from "express";
import { CreateAccountUseCase } from "@domain/usecases/account";
import { UserMongoRepository } from "@infra/adapters/repositories/user";
import { BcryptEncryptorService } from "@infra/adapters/services";
import { CreateAccountRoute } from "@infra/adapters/http/modules/account/create/create.account.route";
import { ENCRYPTOR_SALT } from "@infra/config/environment";

export class CreateAccountFactory {
  static create(): Router {
    const userRepository = new UserMongoRepository();
    const encryptorService = new BcryptEncryptorService(ENCRYPTOR_SALT);
    const useCase = new CreateAccountUseCase(
      userRepository,
      userRepository,
      encryptorService
    );
    const route = new CreateAccountRoute(useCase);
    return route.getRoute();
  }
}
