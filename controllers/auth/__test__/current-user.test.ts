import request from "supertest";
import { app } from "../../../app";

it("responds with details of current user", async () => {
  let user = await request(app)
    .post("/api/v1/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const token = user.body.token;

  let response = await request(app)
    .get("/api/v1/users/currentuser")
    .set("x-access-token", token)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual(user.body.user.email);
  expect(response.body.currentUser.id).toEqual(user.body.user.id);
});
