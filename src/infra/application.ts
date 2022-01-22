import express, { Express } from "express";
import cors from "cors";
import { defaultExceptionMiddleware } from "./adapters/http/middlewares";
import { MongoDBDatabase } from "./config/mongodb.database";
import { API_NAME, API_PORT, DATABASE_URL } from "./config/environment";

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
    this.registerRoutes();
    this.registerMiddlewares();
  }

  private registerRoutes() {
    // TODO: create routes
  }

  private registerMiddlewares() {
    this.app.use(defaultExceptionMiddleware);
  }

  async start(): Promise<void> {
    await MongoDBDatabase.connect(DATABASE_URL);
    this.app.listen(API_PORT, () => {
      console.log(`${API_NAME} is running on port ${API_PORT}.`);
    });
  }
}
