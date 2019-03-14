const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
    it.skip("should set testing environment", () => {
        expect(process.env.DB_ENV).toBe("development");
      });

      
  describe("GET /", () => {
    it.skip("responds 200 OK", async () => {
      const res = await request(server).get("/");

      expect(res.status).toEqual(200);
    });

    it.skip("returns a JSON object", async () => {
      const res = await request(server).get("/");

      expect(res.type).toEqual("application/json");
    });

    it.skip("returns expected message", async () => {
      const json = { message: "Welcome to the Essentialism API." };
      const res = await request(server).get("/");

      expect(res.body).toEqual(json);
    });
  });
});
