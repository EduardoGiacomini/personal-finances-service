import { User } from "./user";

export interface Wallet {
  _id?: string;
  user: User;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
}
