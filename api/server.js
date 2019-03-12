const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const authRoutes = require('../auth/auth-routes');
const userRoutes = require('../user/user-routes');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', authRoutes);
server.use('/users', userRoutes)

server.get('/', (req, res) => {
    res.status(200).send("Welcome to Essentialism.");
})

module.exports = server;