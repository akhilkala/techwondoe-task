import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router";
import { errorHandler, notFoundHandler } from "./utils/utilities";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api", router);
app.use("*", notFoundHandler);
app.use(errorHandler);

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}...`)
);
