import { Request, Response } from "express";

export const createController = async (req: Request, res: Response) => {
  res.send("Hey there, this is create task controller!");
};
