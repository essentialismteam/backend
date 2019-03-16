const db = require("../database/db-config");

module.exports = {
  getCompleteUserInfo,
  updateUserInfo,
  getJournalById,
  getUserJournalByUserId,
  addJournal,
  updateJournal,
  deleteJournal,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  getValueById,
  getUserValueByValueId,
  addValue,
  updateValue,
  deleteUserValue
};


// USER helper functions

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

function updateUserInfo(id, userObject) {
  return db("users")
    .where("id", id)
    .update(userObject, "id");
}


// JOURNAL helper functions 

function getJournalById(id) {
  const entry = db("journal")
    .select("id", "journal_entry")
    .where("id", id)
    .first();

  return entry;
}

function getUserJournalByUserId(userId) {
  return db("users")
    .join("journal", "users.id", "journal.user_id")
    .select("journal.journal_entry as journal")
    .where("users.id", userId);
}

async function addJournal(entry) {
  const [id] = await db("journal").insert(entry, "id");
  const newJournal = await getJournalById(id);
  return newJournal;
}

function updateJournal(userId, entry) {
  return db("journal")
    .where("user_id", userId)
    .update(entry, "id");
}

function deleteJournal(id) {
  return db("journal")
    .where("user_id", id)
    .del();
}


// PROJECTS helper functions

function getProjectById(id) {
  const project = db("projects")
    .select("id", "project_name")
    .where("id", id)
    .first();

  return project;
}

async function addProject(project) {
  const [id] = await db("projects").insert(project, "id");

  const newProject = await getProjectById(id);

  return newProject;
}

function updateProject(id, project) {
  return db("projects")
    .where("id", id)
    .update(project, "id");
}

function deleteProject(id) {
  console.log("deleteProject", id);
  return db("projects")
    .where("id", id)
    .del();
}


// VALUES helper functions

function getUserValueByValueId(valueId, userId) {
  return db("user_values")
    .where({ value_id: valueId, user_id: userId })
    .first();
}

function getValueById(id) {
  return db("values")
    .where("id", id)
    .first();
}

async function addValue(value) {
  await db("user_values").insert(value, "value_id");

  const values = await db("users")
    .join("user_values", "users.id", "user_values.user_id")
    .join("values", "values.id", "user_values.value_id")
    .select("values.value_name as value", "values.id")
    .where("users.id", value.user_id);

  return values;
}

function updateValue(oldValueId, userId, newValueId) {
  return db("user_values")
    .where({ value_id: oldValueId, user_id: userId })
    .update({ value_id: newValueId }, "id");
}

function deleteUserValue(valueId, userId) {
  return db("user_values")
    .where({ value_id: valueId, user_id: userId })
    .del();
}
