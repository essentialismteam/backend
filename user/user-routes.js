const express = require("express");
const dbErrors = require("../database/db-errors");

const User = require("./user-helper");

const router = express.Router();

router.get("/", (req, res) => {
  User.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}` });
    });
});

router.get("/:id", (req, res) => {

  User.getCompleteUserInfo(req.params.id)
    .then(userInfo => {
     
      res.status(200).json(userInfo);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}` });
    });
});

module.exports = router;
