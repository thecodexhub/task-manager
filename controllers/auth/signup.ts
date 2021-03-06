import { Request, Response } from "express";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";

import { BadRequestError } from "../../errors/bad-request-error";

export const signupController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email already in use!");
  }

  const user = User.build({ email, password });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  res.status(201).send({ user, token: userJwt });
};
