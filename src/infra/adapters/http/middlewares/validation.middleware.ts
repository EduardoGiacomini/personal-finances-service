import { plainToClass } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { ValidationException } from "@infra/exceptions";

export function validationMiddleware(DTO: any): RequestHandler {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await validateOrReject(plainToClass(DTO, request.body));
      next();
    } catch (errors: any) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints))
        .join(", ");
      next(new ValidationException(message));
    }
  };
}
