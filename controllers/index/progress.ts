import { Request, Response } from "express";

export const progressController = async (req: Request, res: Response) => {
  res.send("Hi this is the progress controller");
};
