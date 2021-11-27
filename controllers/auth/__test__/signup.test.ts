import request from "supertest";
import { app } from "../../../app";

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/v1/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/v1/users/signup")
    .send({
      email: "test@test.com",
      password: "password2",
    })
    .expect(400);
});

it("responds with a token when provided valid credentials", async () => {
  const response = await request(app)
    .post("/api/v1/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.body.token).toBeDefined();
});
