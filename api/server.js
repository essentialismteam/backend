const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const authRoutes = require('../auth/auth-routes')

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', authRoutes);

server.get('/', (req, res) => {
    res.status(200).send("Welcome to Essentialism.");
})

module.expors = server;