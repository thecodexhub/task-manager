import { Request, Response } from "express";

import { Task } from "../../models/task";

export const doneLatestController = async (req: Request, res: Response) => {
  const queryStartDay = new Date(
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
  );

  const tasks = await Task.find({
    userId: req.currentUser!.id,
    done: true,
    startTime: { $gte: queryStartDay },
  });

  res.status(200).send(tasks);
};
