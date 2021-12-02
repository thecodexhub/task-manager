import { Request, Response } from "express";

export const assignedController = async (req: Request, res: Response) => {
  res.send("Hi this is the assigned controller");
};
