import { Request, Response } from "express";

import { Task } from "../../models/task";

export const assignedController = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    userId: req.currentUser!.id,
    done: false,
    startTime: { $gte: new Date() },
  });

  res.status(200).send(tasks);
};
