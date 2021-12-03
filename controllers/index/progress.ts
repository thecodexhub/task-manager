import { Request, Response } from "express";

import { Task } from "../../models/task";

export const progressController = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    userId: req.currentUser!.id,
    startTime: { $lte: new Date() },
    finishTime: { $gte: new Date() },
  });

  res.status(200).send(tasks);
};
