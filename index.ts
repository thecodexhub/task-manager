import express from "express";
import { authRouter } from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.use(authRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
