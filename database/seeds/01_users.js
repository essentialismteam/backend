const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        {
          id: 1,
          username: "admin",
          password: bcrypt.hashSync("password", 10),
          first_name: "Adam",
          last_name: "Ministrator"
        },
        {
          id: 2,
          username: "foobar",
          password: bcrypt.hashSync("banana", 10),
          first_name: "Lois",
          last_name: "Duncan"
        },
        {
          id: 3,
          username: "build",
          password: bcrypt.hashSync("week", 10),
          first_name: "Eric",
          last_name: "MacDonald"
        }
      ]);
    });
};
