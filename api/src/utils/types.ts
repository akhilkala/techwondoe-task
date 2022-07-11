import { NextFunction, Request, Response } from "express";

export type Route = (req: Request, res: Response, next: NextFunction) => any;

export type Nullable<T> = T | null;
