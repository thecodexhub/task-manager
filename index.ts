import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { authRouter } from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

dotenv.config();

const app = express();
app.use(express.json());

app.use(authRouter);
app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const port = 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Cnnected to MongoDB...");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
};

start();
