import { Request, Response } from "express";

export const signoutController = (req: Request, res: Response) => {
  res.status(200).send({ user: null, token: null });
};
