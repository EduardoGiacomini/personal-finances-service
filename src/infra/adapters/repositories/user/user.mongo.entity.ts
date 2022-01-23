import { Schema, model } from "mongoose";
import { User } from "@domain/entities";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const UserMongoEntity = model<User>("User", userSchema);
export default UserMongoEntity;
