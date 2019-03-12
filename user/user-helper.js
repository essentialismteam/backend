const db = require("../database/db-config");

module.exports = {
  getAllUsers,
  getCompleteUserInfo,
  addJournal,
  addProject
};

function getAllUsers() {
  return db("users").orderBy("users.id", "asc");
}

async function getCompleteUserInfo(userId) {
  const user = await db("users")
    .select("users.id", "users.username", "users.first_name", "users.last_name")
    .where("id", userId)
    .first();

  const values = await db("users")
    .join("user_values", "users.id", "user_values.user_id")
    .join("values", "values.id", "user_values.value_id")
    .select("values.value_name as value", "values.id")
    .where("users.id", userId);

  const projects = await db("users")
    .join("projects", "users.id", "projects.user_id")
    .select("projects.id", "projects.project_name as project")
    .where("users.id", userId);

  const [journal] = await db("users")
    .join("journal", "users.id", "journal.user_id")
    .select("journal.journal_entry as journal")
    .where("users.id", userId);

  return { ...user, ...journal, values, projects };
}

async function addJournal(entry) {
    const [id] = await db("journal").insert(entry, "id");

    return id;
}

async function addProject(project) {
    const [id] = await db("projects").insert(project, "id");

    return id;
}