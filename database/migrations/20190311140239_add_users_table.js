
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
      table.increments();
      table.string("username", 28).notNullable().unique();
      table.string("password", 128).notNullable();
      table.string("first_name", 55).notNullable();
      table.string("last_name", 55);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
