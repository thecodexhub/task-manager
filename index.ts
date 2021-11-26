import mongoose from "mongoose";
import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();
const port = 3000;

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
};

start();
