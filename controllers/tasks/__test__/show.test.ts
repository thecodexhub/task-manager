import request from "supertest";
import { app } from "../../../app";

const createTask = (user: string) => {
  const title = "Task title";
  const startTime = new Date().toISOString();
  const finishTime = new Date(
    new Date().getTime() + 5 * 60 * 1000
  ).toISOString();

  return request(app)
    .post("/api/v1/tasks")
    .set("x-access-token", user)
    .send({
      title,
      startTime,
      finishTime,
    })
    .expect(201);
};

it("doesn't show the task if the task userId is not same as current user id", async () => {
  const response = await createTask(global.signin());

  await request(app)
    .get(`/api/v1/tasks/${response.body.id}`)
    .set("x-access-token", global.signin())
    .send({})
    .expect(404);
});

it("returns the task if the task is bound to current user", async () => {
  const user = global.signin();

  const response = await createTask(user);

  const taskResponse = await request(app)
    .get(`/api/v1/tasks/${response.body.id}`)
    .set("x-access-token", user)
    .send({})
    .expect(200);

  expect(taskResponse.body.title).toEqual(response.body.title);
  expect(taskResponse.body.startTime).toEqual(response.body.startTime);
});
