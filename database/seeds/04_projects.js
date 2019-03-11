exports.seed = function(knex, Promise) {
  return knex("projects")
    .truncate()
    .then(function() {
      return knex("projects").insert([
        { id: 1, project_name: "Skydiving certification", user_id: 1 },
        { id: 2, project_name: "Weekend dogwalking", user_id: 1 },
        { id: 3, project_name: "Full-time job -- long commute", user_id: 1 },
        {
          id: 4,
          project_name: "Endangered species painting project",
          user_id: 2
        },
        { id: 5, project_name: "House-sitting next week", user_id: 2 },
        {
          id: 6,
          project_name: "Work trip to London next month",
          user_id: 2
        },
        { id: 7, project_name: "Sunday morning pottery class", user_id: 2 },
        {
          id: 8,
          project_name: "Take kids to ballet class, Tuesday nights",
          user_id: 3
        },
        {
          id: 9,
          project_name:
            "Get out the vote for the next election, every Sat at the farmer's market",
          user_id: 3
        },
        { id: 10, project_name: "Weekly household chores", user_id: 3 },
        { id: 11, project_name: "Volunteer at soup kitchen", user_id: 3 },
        {
          id: 12,
          project_name: "Bartend on weeknights for extra cash",
          user_id: 3
        }
      ]);
    });
};
