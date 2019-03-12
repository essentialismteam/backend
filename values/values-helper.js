const db = require("../database/db-config");

module.exports = {
    getAllValues
}

function getAllValues() {
    return db("values").orderBy("id", "asc");
}