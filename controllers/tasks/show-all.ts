import { Request, Response } from "express";

export const showAllController = async (req: Request, res: Response) => {
  res.send("Hey there, this is show all task controller!");
};
