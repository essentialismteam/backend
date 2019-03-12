const db = require("../database/db-config");


module.exports = {
    getAllUsers,
    getCompleteUserInfo
}

function getAllUsers() {
    return db("users").orderBy("users.id", "asc");
}

function getCompleteUserInfo(user) {
    const userInfo = db("")
}