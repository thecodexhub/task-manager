import { Request, Response } from "express";

export const doneLatestController = async (req: Request, res: Response) => {
  res.send("Hi this is the done-latest controller");
};
