const express = require('express');
const bcrypt = require('bcryptjs');

const generateToken = require('./generate-token');
const Users = require('./auth-helper');

const router = express.Router();

router.post('/register', (req, res) => {
    let newUser = req.body;

    if (!newUser.username || !newUser.password) {

        res.status(400).json({message: "Please provide a username and password to register."})

    } else {

        const hash = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hash;

        // database call to users table; insert new user and return new user's info (send 201 on success, 500 on server error)
    }
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    if (username && password) {

        // database call to users table by id -- name variable "user"

        if (user && bcrypt.compareSync(password, user.password)) {

            const token = generateToken.generateToken(user);
            res.status(200).json({message: `Welcome, ${user.username}`, token});

        } else {

            res.status(404).json({message: "Invalid credentials."});

        }
    } else {

        res.status(401).json({message: "Please provide a username and password to log in."})

    }
})

module.exports = router;