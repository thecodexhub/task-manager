import request from "supertest";
import { app } from "../../../app";

import { Task } from "../../../models/task";

it("returns 201 status on creating a new task", async () => {
  await request(app)
    .post("/api/v1/tasks")
    .set("x-access-token", global.signin())
    .send({
      title: "Write documentation",
      description: "This is a new task",
      startTime: new Date().toISOString(),
      finishTime: new Date(new Date().getTime() + 5 * 60 * 1000).toISOString(),
    })
    .expect(201);
});

it("creates a new task", async () => {
  const title = "Write documentation";

  const response = await request(app)
    .post("/api/v1/tasks")
    .set("x-access-token", global.signin())
    .send({
      title: title,
      description: "This is a new task",
      startTime: new Date().toISOString(),
      finishTime: new Date(new Date().getTime() + 5 * 60 * 1000).toISOString(),
    })
    .expect(201);

  const tasks = await Task.find({ id: response.body.id });
  expect(tasks[0].title).toEqual(title);
});
