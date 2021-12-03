import request from "supertest";
import { app } from "../../../app";

const title = "Task title";
const startTime = new Date(new Date().getTime() - 20 * 60 * 1000).toISOString();
const startTime2 = new Date(new Date().getTime() + 5 * 60 * 1000).toISOString();
const finishTime = new Date(new Date().getTime() - 5 * 60 * 1000).toISOString();
const finishTime2 = new Date(
  new Date().getTime() + 15 * 60 * 1000
).toISOString();

const createTask = (
  user: string,
  suppliedStartTime: string,
  suppliedFinishTime: string
) => {
  return request(app)
    .post("/api/v1/tasks")
    .set("x-access-token", user)
    .send({
      title,
      startTime: suppliedStartTime,
      finishTime: suppliedFinishTime,
    })
    .expect(201);
};

it("returns the tasks that are in progress", async () => {
  const user = global.signin();

  await createTask(user, startTime, finishTime); // Already gone
  await createTask(user, startTime2, finishTime2); // Future task
  await createTask(user, startTime, finishTime2); // In progress
  await createTask(global.signin(), startTime, finishTime2); // In progress, different user

  const response = await request(app)
    .get("/api/v1/progress")
    .set("x-access-token", user)
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(1);
});
