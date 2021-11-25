import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const currentUserController = (req: Request, res: Response) => {
  const token: string = req.headers["x-access-token"] as string;

  if (!token) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null });
  }
};
