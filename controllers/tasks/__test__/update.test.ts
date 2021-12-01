import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";

const title = "Task title";
const startTime = new Date().toISOString();
const finishTime = new Date(new Date().getTime() + 5 * 60 * 1000).toISOString();

it("returns 404 if the task is not found", async () => {
  const id = new mongoose.Types.ObjectId().toString("hex");
  await request(app)
    .patch(`/api/v1/tasks/${id}`)
    .set("x-access-token", global.signin())
    .send({
      title,
      startTime,
      finishTime,
    })
    .expect(404);
});

it("returns 401 if the task is created by the current user", async () => {
  const response = await request(app)
    .post("/api/v1/tasks")
    .set("x-access-token", global.signin())
    .send({
      title,
      startTime,
      finishTime,
    })
    .expect(201);

  await request(app)
    .patch(`/api/v1/tasks/${response.body.id}`)
    .set("x-access-token", global.signin())
    .send({
      title,
      startTime,
      finishTime,
    })
    .expect(401);
});
