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

export class ApplicationFactory {
  static create(): Application {
    return new Application();
  }
}

export class Application {
  private readonly app: Express;

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

  async start(): Promise<void> {
    await MongoDBDatabase.connect(DATABASE_URL);
    this.app.listen(API_PORT, () => {
      console.log(`${API_NAME} is running on port ${API_PORT}.`);
    });
  }
}
