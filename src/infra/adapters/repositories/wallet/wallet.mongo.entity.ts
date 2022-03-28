import { Schema, model } from "mongoose";
import { Wallet } from "@domain/entities";

const walletSchema = new Schema<Wallet>(
  {
    value: {
      type: Number,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WalletMongoEntity = model<Wallet>("Wallet", walletSchema);
export default WalletMongoEntity;
