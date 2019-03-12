const db = require("../database/db-config");


module.exports = {
    getAllUsers
}

function getAllUsers() {
    return db("users").orderBy("users.id", "asc");
}