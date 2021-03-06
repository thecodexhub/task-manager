import express from "express";
import "express-async-errors";

import { authRouter } from "./routes/auth.routes";
import { tasksRouter } from "./routes/tasks.routes";
import { indexRouter } from "./routes/index.routes";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(express.json());

app.use(authRouter);
app.use(tasksRouter);
app.use(indexRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
