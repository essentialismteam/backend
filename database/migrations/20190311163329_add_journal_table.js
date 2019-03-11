exports.up = function(knex, Promise) {
  return knex.schema.createTable("journal", table => {
    table.increments();
    table.text("journal_entry").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("journal");
};
