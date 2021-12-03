import { Request, Response } from "express";

import { Task } from "../../models/task";

export const searchController = async (req: Request, res: Response) => {
  const { input } = req.body;
  const tasks = await Task.find({
    userId: req.currentUser!.id,
    title: { $regex: input, $options: "i" },
  });

  res.status(200).send(tasks);
};
