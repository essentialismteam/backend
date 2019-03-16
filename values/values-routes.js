const express = require("express");

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
          .json({ message: "There was an error retrieving the values." });
      });
  });

module.exports = router;