const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const { authorize } = require('../auth/authenticate');
const authRoutes = require('../auth/auth-routes');
const userRoutes = require('../user/user-routes');
const valuesRoutes = require('../values/values-routes');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', authRoutes);
server.use('/users', authorize, userRoutes);
server.use("/values", authorize, valuesRoutes);

server.get('/', (req, res) => {
    res.status(200).send("Welcome to the Essentialism API.");
})

module.exports = server;