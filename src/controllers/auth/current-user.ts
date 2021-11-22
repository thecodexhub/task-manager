import { Request, Response } from "express";

export const currentUserController = (req: Request, res: Response) => {
  console.log("Hey this is currentuser controller");
};
