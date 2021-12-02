import { Request, Response } from "express";

export const searchController = async (req: Request, res: Response) => {
  res.send("Hi this is the search controller");
};
