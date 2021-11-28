import { Request, Response } from "express";

export const deleteController = async (req: Request, res: Response) => {
  res.send("Hey there, this is delete task controller!");
};
