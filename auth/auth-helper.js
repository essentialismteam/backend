const db = require("../database/db-config");

module.exports = {
    registerUser,
    getUserByUsername,
    getUserById
}

async function registerUser(user) {

    const [id] = await db("users").insert(user);
    
    const newUser = await getUserById(id);

    return newUser;
}

function getUserByUsername(username) {

    return db("users").where("username", username).first();

}

function getUserById(id) {

    return db("users").where({id}).first();

}