import { connect } from "mongoose";

export class MongoDBDatabase {
  static async connect(url: string): Promise<void> {
    await connect(url);
  }
}
