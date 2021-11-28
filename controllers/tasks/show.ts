import { Request, Response } from "express";

export const showController = async (req: Request, res: Response) => {
  res.send("Hey there, this is show single task controller!");
};
