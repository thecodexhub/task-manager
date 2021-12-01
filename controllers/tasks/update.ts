import { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { NotAuthorizedError } from "../../errors/not-authorized-error";

import { Task } from "../../models/task";

export const updateController = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new NotFoundError();
  }

  if (task.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  const { title, description, startTime, finishTime } = req.body;

  if (title) task.title = title;
  if (description) task.description = description;
  if (startTime) task.startTime = startTime;
  if (finishTime) task.finishTime = finishTime;

  await task.save();
  res.status(200).send(task);
};
