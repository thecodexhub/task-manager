import { Request, Response } from "express";

export const updateController = async (req: Request, res: Response) => {
  res.send("Hey there, this is update task controller!");
};
