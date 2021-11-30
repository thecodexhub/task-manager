import { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { Task } from "../../models/task";

export const showController = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    id: req.params.id,
    userId: req.currentUser!.id,
  });

  if (tasks.length == 0) {
    throw new NotFoundError();
  }

  res.send(tasks[0]);
};
