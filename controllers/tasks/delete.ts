import { Request, Response } from "express";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { NotFoundError } from "../../errors/not-found-error";
import { Task } from "../../models/task";

export const deleteController = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new NotFoundError();
  }

  if (task.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  await Task.deleteOne({ id: task.id });
  res.sendStatus(200);
};
