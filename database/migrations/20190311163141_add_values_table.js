
exports.up = function(knex, Promise) {
  return knex.schema.createTable("values", table => {
      table.increments();
      table.string("value_name").notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("values");
};
