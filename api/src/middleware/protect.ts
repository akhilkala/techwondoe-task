import { User } from "@prisma/client";
import {
  HTTPError,
  HttpStatusCode,
  route,
  verifyJWT,
} from "../utils/utilities";

export default route((req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    const user = verifyJWT(token as string);
    req.user = user as User;

    next();
  } catch (err) {
    throw new HTTPError(HttpStatusCode.UNAUTHORIZED, "Auth Failed");
  }
});
