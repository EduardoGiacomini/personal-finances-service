import { Request, Response, NextFunction } from "express";
import { JsonWebTokenTokenService } from "@infra/adapters/services";
import { JWT_SECRET } from "@infra/config/environment";
import { UnauthorizedException } from "@infra/exceptions";

export function validateTokenMiddleware(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = getTokenFromRequestHeaders(request);

    if (!token) {
      next(new UnauthorizedException());
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      next(new UnauthorizedException());
    }

    const { id } = decodedToken;
    request["userId"] = id;
    next();
  } catch (error: any) {
    next(error);
  }
}

function getTokenFromRequestHeaders(request) {
  return request.headers.authorization?.split("Bearer ")?.[1];
}

function verifyToken(token) {
  const jsonWebTokenTokenService = new JsonWebTokenTokenService(JWT_SECRET);
  return jsonWebTokenTokenService.verify(token);
}
