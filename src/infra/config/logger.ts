import winston from "winston";
import { API_LOG_LEVEL } from "./environment";

export const Logger = winston.createLogger({
  level: API_LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/service.log" }),
  ],
});
