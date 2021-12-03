import { Request, Response } from "express";

import { Task } from "../../models/task";

export const doneController = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    userId: req.currentUser!.id,
    done: true,
  });

  res.status(200).send(tasks);
};
