import jwt from "jsonwebtoken";
import { HTTPError, HttpStatusCode, route } from "../utils/utilities";

export default route((req, res, next) => {
  if (!process.env.JWT_SECRET) throw new Error("API environtment invalid");
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    const user = jwt.verify(token as string, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (err) {
    throw new HTTPError(HttpStatusCode.UNAUTHORIZED, "Auth Failed");
  }
});
