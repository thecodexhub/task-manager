import { Request, Response } from "express";

export const backlogController = async (req: Request, res: Response) => {
  res.send("Hi this is the backlog controller");
};
