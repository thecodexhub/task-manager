import request from "supertest";
import { app } from "../../../app";

const title = "Task title";
const startTime = new Date(new Date().getTime() - 20 * 60 * 1000).toISOString();
const startTime2 = new Date(
  new Date().getTime() + 20 * 60 * 1000
).toISOString();
const finishTime = new Date(
  new Date().getTime() + 45 * 60 * 1000
).toISOString();

const createTask = (user: string, suppliedStartTime: string) => {
  return request(app)
    .post("/api/v1/tasks")
    .set("x-access-token", user)
    .send({
      title,
      startTime: suppliedStartTime,
      finishTime,
    })
    .expect(201);
};

it("returns the backlog tasks corresponsing to the current user", async () => {
  const user = global.signin();

  await createTask(user, startTime);
  await createTask(user, startTime2);
  await createTask(user, startTime2);
  await createTask(global.signin(), startTime);
  await createTask(global.signin(), startTime2);

  const response = await request(app)
    .get("/api/v1/assigned")
    .set("x-access-token", user)
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(2);
});
