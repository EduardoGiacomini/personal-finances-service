import { User } from "@domain/entities";

export interface GetByEmailUserRepository {
  getByEmail(email: User["email"]): Promise<User>;
}
