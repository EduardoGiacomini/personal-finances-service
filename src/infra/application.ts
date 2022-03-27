import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import factories from "./factories";
import { handleDefaultExceptionMiddleware } from "./adapters/http/middlewares";
import { MongoDBDatabase } from "./config/mongodb.database";
import {
  API_NAME,
  API_PORT,
  API_PREFIX_URL,
  DATABASE_URL,
} from "./config/environment";

class Application {
  public readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.registerRoutes();
    this.registerMiddlewares();
  }

  private registerRoutes() {
    for (const factory in factories) {
      const route = factories[factory].create();
      this.app.use(API_PREFIX_URL, route);
    }
  }

  private registerMiddlewares() {
    this.app.use(handleDefaultExceptionMiddleware);
  }

  start(): void {
    this.app.listen(API_PORT, () => {
      console.log(`🚀  ${API_NAME} is running on port ${API_PORT}.`);
    });
  }
}

export class ApplicationFactory {
  static async create() {
    console.log("🦄  Running application");
    const app = new Application();
    await MongoDBDatabase.connect(DATABASE_URL);
    app.start();
  }
}
