import request from "supertest";
import { app } from "../../../app";

const title = "Task title";
const startTime = new Date(new Date().getTime() - 20 * 60 * 1000).toISOString();
const startTime2 = new Date(
  new Date().getTime() - 8 * 24 * 60 * 60 * 1000
).toISOString();
const finishTime = new Date(new Date().getTime() - 5 * 60 * 1000).toISOString();

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

const markDone = (user: string, taskId: string) => {
  return request(app)
    .patch(`/api/v1/tasks/${taskId}`)
    .set("x-access-token", user)
    .send({
      done: true,
    })
    .expect(200);
};

it("returns the tasks that are done last week", async () => {
  const user = global.signin();
  const user2 = global.signin();

  const task1 = await createTask(user, startTime);
  const task2 = await createTask(user, startTime2);
  const task3 = await createTask(user, startTime);
  const task4 = await createTask(user2, startTime);

  await markDone(user, task1.body.id);
  await markDone(user, task2.body.id);
  await markDone(user, task3.body.id);
  await markDone(user2, task4.body.id);

  const response = await request(app)
    .get("/api/v1/done/latest")
    .set("x-access-token", user)
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(2);
});
