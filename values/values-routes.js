const express = require("express");
const dbErrors = require("../database/db-errors");

const Values = require('./values-helper');

const router = express.Router();

router.get("/", (req, res) => {
    Values.getAllValues()
      .then(values => {
        res.status(200).json(values);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}` });
      });
  });

module.exports = router;