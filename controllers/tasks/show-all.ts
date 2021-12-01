import { Request, Response } from "express";
import { Task } from "../../models/task";

export const showAllController = async (req: Request, res: Response) => {
  const tasks = await Task.find({ userId: req.currentUser!.id });
  res.status(200).send(tasks);
};
