import { Request, Response } from "express";

import { Task } from "../../models/task";

export const backlogController = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    userId: req.currentUser!.id,
    done: false,
    finishTime: { $lte: new Date() },
  });

  res.status(200).send(tasks);
};
