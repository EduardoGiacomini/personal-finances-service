import { Request, Response, NextFunction } from "express";

export function handleDefaultExceptionMiddleware(
  error: any,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  const code = error.code || "INTERNAL_SERVER_ERROR";

  if (status >= 500) {
    console.error("💥💥💥 INTERNAL SERVER ERROR 💥💥💥");
    console.error(error);
    console.error("💥💥💥 INTERNAL SERVER ERROR 💥💥💥");
  }

  response.status(status).send({ status, message, code });
}
