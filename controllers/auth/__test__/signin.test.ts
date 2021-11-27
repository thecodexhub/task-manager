import request from "supertest";
import { app } from "../../../app";

it("fails when a non-existing email is passed", async () => {
  await request(app)
    .post("/api/v1/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is passed", async () => {
  await request(app)
    .post("/api/v1/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/v1/users/signin")
    .send({
      email: "test@test.com",
      password: "password2",
    })
    .expect(400);
});

it("responds with a token when provided valid credentials", async () => {
  await request(app)
    .post("/api/v1/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/v1/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.body.token).toBeDefined();
});
