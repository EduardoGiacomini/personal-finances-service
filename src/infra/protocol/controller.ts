import { NextFunction, Request, Response } from "express";

export interface Controller {
  execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response>;
}
