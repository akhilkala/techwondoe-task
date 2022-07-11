import prisma from "../utils/prisma";
import { HTTPError, HttpStatusCode, route } from "../utils/utilities";
import bcrypt from "bcrypt";

export const register = route(async (req, res, next) => {
  const { name, email, password } = req.body;

  const exisitngUser = await prisma.user.findUnique({ where: { email } });
  if (exisitngUser)
    throw new HTTPError(HttpStatusCode.CONFLICT, "User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  res.status(200).json({
    message: "User Created Succesfully",
  });
});

export const login = route(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    throw new HTTPError(HttpStatusCode.BAD_REQUEST, "User does not exist");

  const check = await bcrypt.compare(password, user.password);
  if (!check) throw new HTTPError(HttpStatusCode.FORBIDDEN, "Auth Failed");
});
