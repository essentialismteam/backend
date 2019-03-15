const request = require("supertest");
const server = require("../api/server");
const db = require('../database/db-config');
const bcrypt = require('bcryptjs')

afterEach(async () => {
    await db("users").truncate();
  })

describe("auth-routes.js", () => {

  describe("POST /auth/register", () => {
    it("responds 201 Created", async () => {
      const res = await request(server).post("/auth/register").send({username: "admin", password: bcrypt.hashSync("password", 10), first_name: "Adam"});

      expect(res.status).toEqual(201);
    });

    it("returns a JSON object", async () => {
      const res = await request(server).post("/auth/register").send({username: "admin", password: bcrypt.hashSync("password", 10), first_name: "Adam"});

      expect(res.type).toEqual("application/json");
    });

  });

  //NOT FOUND ???
  
  // describe("POST /auth/login", () => {
  //   it("responds 200 OK", async () => {
  //       const res = await request(server).post("/auth/login").send({username: "admin", password: "password"});

  //       expect(res.status).toEqual(200);
  //   })

  //   it("returns a JSON object", async () => {
  //       const res = await request(server).post("/auth/login").send({username: "admin", password: bcrypt.hashSync("password", 10)});
  
  //       expect(res.type).toEqual("application/json");
  //     });
  


  // })
});