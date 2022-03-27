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
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        // Note: prevent return the password to the client
        delete ret.password;
      },
    },
  }
);

const UserMongoEntity = model<User>("User", userSchema);
export default UserMongoEntity;
