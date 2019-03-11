exports.seed = function(knex, Promise) {
  return knex("journal")
    .truncate()
    .then(function() {
      return knex("journal").insert([
        {
          id: 1,
          journal_entry:
            "I just want to have fun and be able to do lots of adventurous things. You only live once, and I want to make sure I enjoy life and do as much as I can! I also want to help people be happy too, and I think I can do that by making people laugh.",
          user_id: 1
        },
        {
          id: 2,
          journal_entry:
            "Since the most impactful place to make a difference is your local community, I want to focus on that. There are bigger things to fix in the world than my community's problems, but it's hard to actually do something about them by myself. Here at home I'd like to try to live by example and work with my community to invent solutions to our problems.",
          user_id: 3
        },
        {
          id: 3,
          journal_entry:
            "Nature is endlessly inspiring. I want to travel and experience nature and make art. Maybe my art can be a kind of environmental activism?",
          user_id: 2
        }
      ]);
    });
};
