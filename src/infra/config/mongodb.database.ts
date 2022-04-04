import { connect } from "mongoose";
import { Logger } from "./logger";

export class MongoDBDatabase {
  static async connect(url: string): Promise<void> {
    try {
      await connect(url);
      Logger.info("🌱  MongoDB connected");
    } catch (error) {
      Logger.error("⚠️  Error on connect to MongoDB: ", error);
      process.exit(1);
    }
  }
}
