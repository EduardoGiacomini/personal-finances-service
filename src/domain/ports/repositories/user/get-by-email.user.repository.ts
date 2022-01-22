import { User } from "@domain/entities";

export interface GetByEmailUserRepository {
  getByEmail(email: string): Promise<User>;
}
