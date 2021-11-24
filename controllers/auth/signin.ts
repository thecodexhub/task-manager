import { Request, Response } from "express";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";

import { PasswordManager } from "../../services/password-manager";
import { BadRequestError } from "../../errors/bad-request-error";

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordMatching = await PasswordManager.compare(
    existingUser.password,
    password
  );
  if (!isPasswordMatching) {
    throw new BadRequestError("Invalid credentials");
  }

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!
  );

  res.status(200).send({ user: existingUser, token: userJwt });
};
