const request = require("supertest");
const server = require("./server");
const db = require('../database/db-config');

afterEach(async () => {
  await db("users").truncate();
})

describe("server.js", () => {
    // it("should set testing environment", () => {
    //     expect(db.dbEnv).toBe("development");
    //   });

      
  describe("GET /", () => {
    it("responds 200 OK", async () => {
      const res = await request(server).get("/");

      expect(res.status).toEqual(200);
    });

    it("returns a JSON object", async () => {
      const res = await request(server).get("/");

      expect(res.type).toEqual("application/json");
    });

    it("returns expected message", async () => {
      const json = { message: "Welcome to the Essentialism API." };
      const res = await request(server).get("/");

      expect(res.body).toEqual(json);
    });
  });
});
