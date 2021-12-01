import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

import { Task } from "../../models/task";

describe("Create route handler", () => {
  it("can only be accessed if the user is signed in", async () => {
    await request(app).post("/api/v1/tasks").send({}).expect(401);
  });

  it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", global.signin())
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it("returns an error if invalid title is provided", async () => {
    await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", global.signin())
      .send({
        title: "",
        startTime: new Date().toISOString(),
        finishTime: new Date(
          new Date().getTime() + 5 * 60 * 1000
        ).toISOString(),
      })
      .expect(400);

    await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", global.signin())
      .send({
        startTime: new Date().toISOString(),
        finishTime: new Date(
          new Date().getTime() + 5 * 60 * 1000
        ).toISOString(),
      })
      .expect(400);
  });

  it("returns an error if invalid start time is provided", async () => {
    await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", global.signin())
      .send({
        title: "Write documentation",
        startTime: "",
        finishTime: new Date(
          new Date().getTime() + 5 * 60 * 1000
        ).toISOString(),
      })
      .expect(400);

    await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", global.signin())
      .send({
        title: "Write documentation",
        finishTime: new Date(
          new Date().getTime() + 5 * 60 * 1000
        ).toISOString(),
      })
      .expect(400);
  });

  it("returns an error if invalid finish time is provided", async () => {
    await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", global.signin())
      .send({
        title: "Write documentation",
        startTime: new Date().toISOString(),
        finishTime: "",
      })
      .expect(400);

    await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", global.signin())
      .send({
        title: "Write documentation",
        startTime: new Date().toISOString(),
      })
      .expect(400);
  });

  it("creates a task with valid inputs", async () => {
    let tasks = await Task.find({});
    expect(tasks.length).toEqual(0);

    await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", global.signin())
      .send({
        title: "Write documentation",
        description: "This is a new task",
        startTime: new Date().toISOString(),
        finishTime: new Date(
          new Date().getTime() + 5 * 60 * 1000
        ).toISOString(),
      })
      .expect(201);

    tasks = await Task.find({});
    expect(tasks.length).toEqual(1);
  });
});

describe("Show-all route handler", () => {
  it("can only be accessed if the user is signed in", async () => {
    await request(app).get(`/api/v1/tasks`).send({}).expect(401);
  });

  it("can fetch a list of tasks for a particular user", async () => {
    const user = global.signin();

    const title = "Task title";
    const startTime = new Date().toISOString();
    const finishTime = new Date(
      new Date().getTime() + 5 * 60 * 1000
    ).toISOString();

    await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", user)
      .send({
        title,
        startTime,
        finishTime,
      })
      .expect(201);

    const taskResponse = await request(app)
      .get(`/api/v1/tasks`)
      .set("x-access-token", user)
      .send({})
      .expect(200);

    const taskResponseOtherUser = await request(app)
      .get(`/api/v1/tasks`)
      .set("x-access-token", global.signin())
      .send({})
      .expect(200);

    expect(taskResponse.body.length).toEqual(1);
    expect(taskResponseOtherUser.body.length).toEqual(0);
  });
});

describe("Show route handler", () => {
  it("can only be accessed if the user is signed in", async () => {
    const id = new mongoose.Types.ObjectId().toString("hex");

    await request(app).get(`/api/v1/tasks/${id}`).send({}).expect(401);
  });

  it("returns 404 when the task is not found", async () => {
    const id = new mongoose.Types.ObjectId().toString("hex");

    await request(app)
      .get(`/api/v1/tasks/${id}`)
      .set("x-access-token", global.signin())
      .send({})
      .expect(404);
  });

  it("returns the task if the task is found", async () => {
    const user = global.signin();

    const title = "Task title";
    const startTime = new Date().toISOString();
    const finishTime = new Date(
      new Date().getTime() + 5 * 60 * 1000
    ).toISOString();

    const response = await request(app)
      .post("/api/v1/tasks")
      .set("x-access-token", user)
      .send({
        title,
        startTime,
        finishTime,
      })
      .expect(201);

    const taskResponse = await request(app)
      .get(`/api/v1/tasks/${response.body.id}`)
      .set("x-access-token", user)
      .send({})
      .expect(200);

    expect(taskResponse.body.title).toEqual(title);
    expect(taskResponse.body.startTime).toEqual(startTime);
  });
});

describe("Update route handler", () => {
  const title = "Task title";
  const startTime = new Date().toISOString();
  const finishTime = new Date(
    new Date().getTime() + 5 * 60 * 1000
  ).toISOString();

  it("can only be accessed if the user is signed in", async () => {
    const id = new mongoose.Types.ObjectId().toString("hex");
    await request(app)
      .patch(`/api/v1/tasks/${id}`)
      .send({
        title,
        startTime,
        finishTime,
      })
      .expect(401);
  });

  it("returns 400 if the user provides invalid title or start time or finish time", async () => {
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

    const newTitle = "";
    await request(app)
      .patch(`/api/v1/tasks/${response.body.id}`)
      .set("x-access-token", user)
      .send({
        title: newTitle,
      })
      .expect(400);
  });

  it("returns 200 after updating task when provided valid credentials", async () => {
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

    const newTitle = "New title";
    let taskResponse = await request(app)
      .patch(`/api/v1/tasks/${response.body.id}`)
      .set("x-access-token", user)
      .send({
        title: newTitle,
      })
      .expect(200);

    const newFinishTime = new Date(
      new Date().getTime() + 10 * 60 * 1000
    ).toISOString();

    taskResponse = await request(app)
      .patch(`/api/v1/tasks/${response.body.id}`)
      .set("x-access-token", user)
      .send({
        finishTime: newFinishTime,
      })
      .expect(200);

    expect(taskResponse.body.finishTime).toEqual(newFinishTime);
  });
});

describe("Delete route handler", () => {
  const title = "Task title";
  const startTime = new Date().toISOString();
  const finishTime = new Date(
    new Date().getTime() + 5 * 60 * 1000
  ).toISOString();

  it("can only be accessed if the user is signed in", async () => {
    const id = new mongoose.Types.ObjectId().toString("hex");
    await request(app).delete(`/api/v1/tasks/${id}`).send({}).expect(401);
  });

  it("returns 200 on successful deletion", async () => {
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
  });
});
