const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || "You cannot overestimate the unimportance of practically everything.";

module.exports = {
    generateToken,
    jwtKey
}

// this generates a unique JWT for the logged in user
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, jwtKey, options);
}
