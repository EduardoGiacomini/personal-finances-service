import { connect } from "mongoose";

export class MongoDBDatabase {
  static async connect(url: string): Promise<void> {
    try {
      await connect(url);
      console.log("🌱  MongoDB connected");
    } catch (error) {
      console.error("⚠️  Error on connect to MongoDB: ", error);
      process.exit(1);
    }
  }
}
