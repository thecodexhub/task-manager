import request from "supertest";
import { app } from "../../../app";

const startTime = new Date(new Date().getTime() - 20 * 60 * 1000).toISOString();
const finishTime = new Date(new Date().getTime() + 5 * 60 * 1000).toISOString();

const createTask = (user: string, suppliedTitle: string) => {
  return request(app)
    .post("/api/v1/tasks")
    .set("x-access-token", user)
    .send({
      title: suppliedTitle,
      startTime,
      finishTime,
    })
    .expect(201);
};

it("returns tasks that have matching title with input", async () => {
  const user = global.signin();

  await createTask(user, "Peter Parker");
  await createTask(user, "Sabby Peter");
  await createTask(user, "Johny peteerson");
  await createTask(user, "Alex Saint-peter");
  await createTask(user, "Albert Mark");
  await createTask(user, "Andrew Peterson");

  const response = await request(app)
    .post("/api/v1/search")
    .set("x-access-token", user)
    .send({
      input: "Peter",
    })
    .expect(200);

  expect(response.body.length).toEqual(4);
});
