exports.seed = function(knex, Promise) {
  return knex("values")
    .truncate()
    .then(function() {
      return knex("values").insert([
        { id: 1, value_name: "Athletic ability" },
        { id: 2, value_name: "Art and literature" },
        {
          id: 3,
          value_name:
            "Creativity, discovering or inventing things to make a difference in the world"
        },
        { id: 4, value_name: "Independence" },
        { id: 5, value_name: "Kindness and generosity" },
        { id: 6, value_name: "Living in the moment" },
        {
          id: 7,
          value_name:
            "Membership in a social group (such as your community, racial group, or school club)"
        },
        { id: 8, value_name: "Music" },
        { id: 9, value_name: "My community" },
        { id: 10, value_name: "My moral principles" },
        { id: 11, value_name: "Nature and the environment" },
        { id: 12, value_name: "Relationships with friends and family" },
        { id: 13, value_name: "Sense of humor" },
        { id: 14, value_name: "Success in my career" }
      ]);
    });
};
