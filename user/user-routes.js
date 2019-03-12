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

// POST values
router.post("/:id/values", (req, res) => {

})

// POST projects
router.post("/:id/projects", (req, res) => {

})
// POST journal
router.post("/:id/journal", (req, res) => {
    const { journal_entry, user_id }  = req.body;

    if (!journal_entry || !user_id) {

        res.status(400).json({message: "You must submit a journal entry and user id."})

    } else {

        User.addJournal(req.body).then(id => {
            res.status(201).json(id)
        }).catch(err => {
            res.status(500).json({message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}`})
        })
    }

})

// PUT values

// PUT projects

// PUT journal


module.exports = router;
