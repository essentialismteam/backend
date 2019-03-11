const express = require('express');
const bcrypt = require('bcryptjs');

const generateToken = require('./generate-token');
const Users = require('./auth-helper');
const dbErrors = require('../database/db-errors');

const router = express.Router();

router.post('/register', (req, res) => {
    
    let newUser = req.body;

    if (!newUser.username || !newUser.password || !newUser.first_name) {

        res.status(400).json({message: "Please provide a username, password, and first name to register."})

    } else {

        const hash = bcrypt.hashSync(newUser.password, 10);

        newUser.password = hash;

        Users.registerUser(newUser).then(user => {

            res.status(201).json(user);

        }).catch(err => {

            res.status(500).json({message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}`});

        })

    }
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    if (username && password) {

        Users.getUserByUsername(username).then(user => {

            if (user && bcrypt.compareSync(password, user.password)) {

                const token = generateToken.generateToken(user);
                res.status(200).json({message: `Welcome, ${user.username}`, token});
    
            } else {
    
                res.status(404).json({message: "Invalid credentials."});
    
            }   
        }).catch(err => {

            res.status(500).json({message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}`});
        })


    } else {

        res.status(401).json({message: "Please provide a username and password to log in."})

    }
});

module.exports = router;