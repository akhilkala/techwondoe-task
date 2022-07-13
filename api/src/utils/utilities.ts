import { NextFunction, Request, Response } from "express";
import { Route } from "./types";
import jwt from "jsonwebtoken";

// Route wrapper to catch errors and intellisence
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

// Function to catch and handle errors in routes
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

// Function to handle undefined routes
export const notFoundHandler = () => {
  throw new HTTPError(HttpStatusCode.NOT_FOUND, "Route not found");
};

// Function to generate JWT token
export const generateJWT = (payload: any, expiresIn = "7d") => {
  if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("Environment Invalid");
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};

// Function to verify JWT token
export const verifyJWT = (token: string) => {
  if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("Environment Invalid");
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
