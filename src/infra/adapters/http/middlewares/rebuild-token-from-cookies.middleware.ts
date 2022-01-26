import { Request, Response, NextFunction } from "express";

export function rebuildTokenFromCookiesMiddleware(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const headerPayload = getCookieFromRequest(request, "header.payload");
  const signature = getCookieFromRequest(request, "signature");

  if (!isThereCookie(headerPayload) || !isThereCookie(signature)) {
    next();
  }

  const token = rebuildToken(headerPayload, signature);
  request.headers["Authorization"] = "Bearer " + token;
  next();
}

function getCookieFromRequest(request, cookieName) {
  return request.cookies[cookieName];
}

function isThereCookie(cookie) {
  return Boolean(cookie);
}

function rebuildToken(headerPayload, signature) {
  return headerPayload + "." + signature;
}
