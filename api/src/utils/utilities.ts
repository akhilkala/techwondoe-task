import { NextFunction, Request, Response } from "express";
import { Route } from "./types";

export const route =
  (fn: Route) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export enum HttpStatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
}

export class HTTPError extends Error {
  public readonly message: string;
  public readonly httpCode: HttpStatusCode;

  constructor(httpCode: HttpStatusCode, message = "") {
    super(message);
    this.message = message;
    this.httpCode = httpCode;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

export const errorHandler = (
  err: HTTPError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.httpCode) {
    console.log(err);
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong!",
      path: req.path,
      method: req.method,
    });
  }

  res.status(err.httpCode).json({
    statusCode: err.httpCode,
    message: err.message,
    path: req.path,
    method: req.method,
  });
};

export const notFoundHandler = () => {
  throw new HTTPError(HttpStatusCode.NOT_FOUND, "Route not found");
};
