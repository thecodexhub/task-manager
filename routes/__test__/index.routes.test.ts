import request from "supertest";
import { app } from "../../app";

describe("Backlog route handler", () => {
  it("can only be accessed if the user is signed in", async () => {
    await request(app).get("/api/v1/backlog").send({}).expect(401);
  });

  it("returns 200 on succesful fetching of backlog tasks", async () => {
    await request(app)
      .get("/api/v1/backlog")
      .set("x-access-token", global.signin())
      .send({})
      .expect(200);
  });
});

describe("Progress route handler", () => {
  it("can only be accessed if the user is signed in", async () => {
    await request(app).get("/api/v1/progress").send({}).expect(401);
  });

  it("returns 200 on succesful fetching of backlog tasks", async () => {
    await request(app)
      .get("/api/v1/progress")
      .set("x-access-token", global.signin())
      .send({})
      .expect(200);
  });
});

describe("Latest completed route handler", () => {
  it("can only be accessed if the user is signed in", async () => {
    await request(app).get("/api/v1/done/latest").send({}).expect(401);
  });

  it("returns 200 on succesful fetching of backlog tasks", async () => {
    await request(app)
      .get("/api/v1/done/latest")
      .set("x-access-token", global.signin())
      .send({})
      .expect(200);
  });
});

describe("All completed route handler", () => {
  it("can only be accessed if the user is signed in", async () => {
    await request(app).get("/api/v1/done").send({}).expect(401);
  });

  it("returns 200 on succesful fetching of backlog tasks", async () => {
    await request(app)
      .get("/api/v1/done")
      .set("x-access-token", global.signin())
      .send({})
      .expect(200);
  });
});

describe("Assigned route handler", () => {
  it("can only be accessed if the user is signed in", async () => {
    await request(app).get("/api/v1/assigned").send({}).expect(401);
  });

  it("returns 200 on succesful fetching of backlog tasks", async () => {
    await request(app)
      .get("/api/v1/assigned")
      .set("x-access-token", global.signin())
      .send({})
      .expect(200);
  });
});

describe("Search route handler", () => {
  it("can only be accessed if the user is signed in", async () => {
    await request(app).post("/api/v1/search").send({}).expect(401);
  });

  it("returns an error if invalid input is provided", async () => {
    await request(app)
      .post("/api/v1/search")
      .set("x-access-token", global.signin())
      .send({
        input: 2,
      })
      .expect(400);

    await request(app)
      .post("/api/v1/search")
      .set("x-access-token", global.signin())
      .send({})
      .expect(400);
  });

  it("returns 200 on succesful fetching of tasks whose title matches input", async () => {
    await request(app)
      .post("/api/v1/search")
      .set("x-access-token", global.signin())
      .send({
        input: "Peter",
      })
      .expect(200);
  });
});
