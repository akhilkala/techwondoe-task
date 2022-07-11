import prisma from "../utils/prisma";
import {
  generateJWT,
  HTTPError,
  HttpStatusCode,
  route,
} from "../utils/utilities";
import bcrypt from "bcrypt";

export const register = route(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new HTTPError(HttpStatusCode.BAD_REQUEST, "Fields missing");

  const exisitngUser = await prisma.user.findUnique({ where: { email } });
  if (exisitngUser)
    throw new HTTPError(HttpStatusCode.CONFLICT, "User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  res.status(200).json({
    message: "User created succesfully",
  });
});

export const login = route(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new HTTPError(HttpStatusCode.BAD_REQUEST, "Fields missing");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    throw new HTTPError(HttpStatusCode.BAD_REQUEST, "User does not exist");

  const check = await bcrypt.compare(password, user.password);
  if (!check) throw new HTTPError(HttpStatusCode.FORBIDDEN, "Auth Failed");

  const token = generateJWT({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  res.status(200).send({
    message: "Logged in succesfully",
    token,
  });
});
