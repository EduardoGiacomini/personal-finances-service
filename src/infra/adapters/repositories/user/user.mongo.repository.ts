import { Model } from "mongoose";
import UserMongoEntity from "./user.mongo.entity";
import { User } from "@domain/entities";
import {
  CreateUserRepository,
  GetByEmailUserRepository,
} from "@domain/ports/repositories/user";

export class UserMongoRepository
  implements CreateUserRepository, GetByEmailUserRepository
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

  async getByEmail(email: string): Promise<User> {
    return this.User.findOne({ email });
  }
}
