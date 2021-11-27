import request from "supertest";
import { app } from "../../app";

describe("Sign up route handler", () => {
  it("returns 201 on successful signup", async () => {
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  });

  it("returns a 400 with an invalid email", async () => {
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "abcdefgh",
        password: "password",
      })
      .expect(400);
  });

  it("returns a 400 with an invalid password", async () => {
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test@test.com",
        password: "pas",
      })
      .expect(400);
  });

  it("returns a 400 with missing email and password", async () => {
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test@test.com",
      })
      .expect(400);

    await request(app)
      .post("/api/v1/users/signup")
      .send({
        password: "ahsjaew",
      })
      .expect(400);
  });
});

describe("Sign in route handler", () => {
  it("returns 200 on successful signin", async () => {
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
        password: "password",
      })
      .expect(200);
  });

  it("returns a 400 with an invalid email", async () => {
    await request(app)
      .post("/api/v1/users/signin")
      .send({
        email: "abcdefgh",
        password: "password",
      })
      .expect(400);
  });

  it("returns a 400 with an empty password", async () => {
    await request(app)
      .post("/api/v1/users/signin")
      .send({
        email: "test@test.com",
        password: "",
      })
      .expect(400);
  });

  it("returns a 400 with missing email and password", async () => {
    await request(app)
      .post("/api/v1/users/signin")
      .send({
        email: "test@test.com",
      })
      .expect(400);

    await request(app)
      .post("/api/v1/users/signin")
      .send({
        password: "ahsjaew",
      })
      .expect(400);
  });
});

describe("Sign out route handler", () => {
  it("returns 200 on successful signout", async () => {
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    await request(app).post("/api/v1/users/signout").send({}).expect(200);
  });
});

describe("Current-user route handler", () => {
  it("responds with the details of currentuser", async () => {
    const user = await request(app)
      .post("/api/v1/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const response = await request(app)
      .get("/api/v1/users/currentuser")
      .set("x-access-token", user.body.token)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual(user.body.user.email);
    expect(response.body.currentUser.id).toEqual(user.body.user.id);
  });
});
