import { Request, Response } from "express";
import { Task } from "../../models/task";

export const createController = async (req: Request, res: Response) => {
  const { title, description, startTime, finishTime } = req.body;

  const task = Task.build({
    title,
    description,
    startTime: new Date(startTime),
    finishTime: new Date(finishTime),
    userId: req.currentUser!.id,
  });

  await task.save();

  res.status(201).send(task);
};
