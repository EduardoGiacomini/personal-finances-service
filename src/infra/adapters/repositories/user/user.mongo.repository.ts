import { Model } from "mongoose";
import UserMongoEntity from "./user.mongo.entity";
import { User } from "@domain/entities";
import {
  CreateUserRepository,
  GetByEmailUserRepository,
  GetByIdUserRepository,
} from "@domain/ports/repositories/user";

export class UserMongoRepository
  implements
    CreateUserRepository,
    GetByEmailUserRepository,
    GetByIdUserRepository
{
  private readonly User: Model<User>;

  constructor() {
    this.User = UserMongoEntity;
  }

  async createUser({ name, email, password }: User): Promise<User> {
    const user = new this.User({ name, email, password });
    await user.save();
    return user;
  }

  async getByEmail(email: User["email"]): Promise<User> {
    return this.User.findOne({ email });
  }

  async getById(_id: User["_id"]): Promise<User> {
    return this.User.findOne({ _id });
  }
}
