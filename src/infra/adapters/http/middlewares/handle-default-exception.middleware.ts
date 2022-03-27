import { Request, Response } from "express";

export function handleDefaultExceptionMiddleware(
  error: any,
  request: Request,
  response: Response
) {
  console.error(error);

  const status = error.status || 500;
  const message = error.message || "Internal server error";
  const code = error.code || "INTERNAL_SERVER_ERROR";

  response.status(status).send({ status, message, code });
}
