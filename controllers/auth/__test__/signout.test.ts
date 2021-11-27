import request from "supertest";
import { app } from "../../../app";

it("responds with null token after signout", async () => {
  let response = await request(app)
    .post("/api/v1/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  response = await request(app)
    .post("/api/v1/users/signout")
    .send({})
    .expect(200);

  expect(response.body.token).toBeNull();
});
