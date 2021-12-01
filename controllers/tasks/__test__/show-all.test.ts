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

it("only returns the tasks associated with currentUser", async () => {
  const user = global.signin();
  await createTask(user);
  await createTask(user);
  await createTask(user);

  const user2 = global.signin();
  await createTask(user2);
  await createTask(user2);

  const taskForUser1 = await request(app)
    .get("/api/v1/tasks")
    .set("x-access-token", user)
    .send()
    .expect(200);

  const taskForUser2 = await request(app)
    .get("/api/v1/tasks")
    .set("x-access-token", user2)
    .send()
    .expect(200);

  expect(taskForUser1.body.length).toEqual(3);
  expect(taskForUser2.body.length).toEqual(2);
});
