import request from "supertest";
import { app } from "../../../app";

const title = "Task title";
const startTime = new Date(new Date().getTime() - 20 * 60 * 1000).toISOString();
const finishTime = new Date(new Date().getTime() - 5 * 60 * 1000).toISOString();
const finishTime2 = new Date(
  new Date().getTime() + 5 * 60 * 1000
).toISOString();

const createTask = (user: string, suppliedFinishTime: string) => {
  return request(app)
    .post("/api/v1/tasks")
    .set("x-access-token", user)
    .send({
      title,
      startTime,
      finishTime: suppliedFinishTime,
    })
    .expect(201);
};

it("returns the backlog tasks corresponsing to the current user", async () => {
  const user = global.signin();

  await createTask(user, finishTime);
  await createTask(user, finishTime);
  await createTask(user, finishTime2);
  await createTask(global.signin(), finishTime);
  await createTask(global.signin(), finishTime2);

  const response = await request(app)
    .get("/api/v1/backlog")
    .set("x-access-token", user)
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(2);
});
