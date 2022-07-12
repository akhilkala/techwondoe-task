import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router";
import { errorHandler, notFoundHandler } from "./utils/utilities";
import { User } from "@prisma/client";

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
      user?: User;
    }
  }
}

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}...`)
);
