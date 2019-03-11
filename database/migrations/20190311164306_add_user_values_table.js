exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_values", table => {
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .integer("value_id")
      .unsigned()
      .references("id")
      .inTable("values")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user_values");
};
