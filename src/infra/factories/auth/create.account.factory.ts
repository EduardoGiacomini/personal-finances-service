import { Router } from "express";
import { CreateAccountUseCase } from "@domain/usecases/auth";
import { UserMongoRepository } from "@infra/adapters/repositories/user";
import { BcryptEncryptorService } from "@infra/adapters/services";
import { CreateAccountRoute } from "@infra/adapters/http/modules/auth/create/create.account.route";
import { ENCRYPTOR_SALT } from "@infra/config/environment";

export class CreateAccountFactory {
  static create(): Router {
    const userRepository = new UserMongoRepository();

    const encryptorService = new BcryptEncryptorService(ENCRYPTOR_SALT);

    const createAccountUseCase = new CreateAccountUseCase(
      userRepository,
      userRepository,
      encryptorService
    );

    const route = new CreateAccountRoute(createAccountUseCase);
    return route.getRoute();
  }
}
