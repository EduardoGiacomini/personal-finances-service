import { User } from "@domain/entities";

export interface GetByIdUserRepository {
  getById(_id: User["_id"]): Promise<User>;
}
