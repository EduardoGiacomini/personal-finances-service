import { User } from "@domain/entities";

export interface CreateUserRepository {
  createUser(user: User): Promise<User>;
}
