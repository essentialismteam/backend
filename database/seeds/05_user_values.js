
exports.seed = function(knex, Promise) {
  return knex('user_values').truncate()
    .then(function () {
      return knex('user_values').insert([
        {user_id: 1, value_id: 1},
        {user_id: 1, value_id: 6},
        {user_id: 1, value_id: 13},
        {user_id: 2, value_id: 2},
        {user_id: 2, value_id: 3},
        {user_id: 2, value_id: 11},
        {user_id: 3, value_id: 3},
        {user_id: 3, value_id: 5},
        {user_id: 3, value_id: 9},
      ]);
    });
};
