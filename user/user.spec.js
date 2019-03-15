const request = require("supertest");
const server = require("../api/server");
const bcrypt = require("bcryptjs");
const db = require("../database/db-config");

// Attempted to send auth token with all requests, token returns undefined

// let token;
// beforeAll(done => {
//   request(server)
//     .post("/auth/login")
//     .send({ username: "admin", password: bcrypt.hashSync("password", 10) })
//     .end((err, res) => {
//       token = res.body.token;
//       done();
//     });
// });

afterEach(async () => {
  await db("users").truncate();
  await db("values").truncate();
  await db("journal").truncate();
  await db("projects").truncate();
  await db("user_values").truncate();
});

describe("user-routes.js", () => {
  describe("GET /users/:id", () => {
    it("responds 200 OK", async () => {
      const res = await request(server)
        .get("/users/1")
        // .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(200);
    });

    it("returns a JSON object", async () => {
      const res = await request(server).get("/users/1");

      expect(res.type).toEqual("application/json");
    });
  });

//   describe("PUT /users/:id", () => {
//     it("responds 200 OK", async () => {

//         const res = await request(server)
//           .put("/users/1").send({first_name: "Bob", last_name: "Hope"})
//           // .set("Authorization", `Bearer ${token}`);
  
//         expect(res.status).toEqual(200);
//       });
  
//       it.skip("returns a JSON object", async () => {
//         const res = await request(server).get("/users/1");
  
//         expect(res.type).toEqual("application/json");
//       });
//   })

describe("/users/:id/journal", () => {
    describe("POST journal", () => {
        it("returns 201", async () => {
            const res = await request(server).post("/users/1/journal").send({journal_entry: "Text"})

            expect(res.status).toEqual(201);
        });

        it("returns a JSON object", async () => {
            const res = await request(server).post("/users/1/journal").send({journal_entry: "Test"})

            expect(res.type).toEqual("application/json");
        })
    })

    describe("PUT journal", () => {
        it("returns 201", async () => {
            await request(server).post("/users/1/journal").send({journal_entry: "Text"})
            const res = await request(server).put("/users/1/journal").send({journal_entry: "New text"})

            expect(res.status).toEqual(201);
        });

        it("returns a JSON object", async () => {
            await request(server).post("/users/1/journal").send({journal_entry: "Text"})
            const res = await request(server).put("/users/1/journal").send({journal_entry: "Test"})

            expect(res.type).toEqual("application/json");
        })
    })

    describe("DELETE journal", () => {
        it("returns 200 OK", async () => {
            await request(server).post("/users/1/journal").send({journal_entry: "Text"})
            const res = await request(server).delete("/users/1/journal")

            expect(res.status).toEqual(200);
        })

        it("returns success message", async () => {
            await request(server).post("/users/1/journal").send({journal_entry: "Text"})
            const res = await request(server).delete("/users/1/journal")

            expect(res.body).toEqual({ message: "The journal entry has been deleted." })
        })
    })
})
});
