import { Request, Response } from "express";

export const doneController = async (req: Request, res: Response) => {
  res.send("Hi this is the done controller");
};
