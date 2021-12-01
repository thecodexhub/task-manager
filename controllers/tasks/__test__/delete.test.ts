import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { Task } from "../../../models/task";

const title = "Task title";
const startTime = new Date().toISOString();
const finishTime = new Date(new Date().getTime() + 5 * 60 * 1000).toISOString();

it("returns 404 when document is not found", async () => {
  const id = new mongoose.Types.ObjectId().toString("hex");
  await request(app)
    .delete(`/api/v1/tasks/${id}`)
    .set("x-access-token", global.signin())
    .send({})
    .expect(404);
});

it("returns 401 when the userId is not equal to current user id", async () => {
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
    .delete(`/api/v1/tasks/${response.body.id}`)
    .set("x-access-token", global.signin())
    .send({})
    .expect(401);
});

it("deletes the document", async () => {
  const user = global.signin();

  const response = await request(app)
    .post("/api/v1/tasks")
    .set("x-access-token", user)
    .send({
      title,
      startTime,
      finishTime,
    })
    .expect(201);

  await request(app)
    .delete(`/api/v1/tasks/${response.body.id}`)
    .set("x-access-token", user)
    .send({})
    .expect(200);

  const taskResponse = await Task.findById(response.body.id);
  expect(taskResponse).toBeNull();
});
