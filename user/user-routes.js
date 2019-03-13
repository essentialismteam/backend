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
  const { value_id, user_id } = req.body;

  if (!value_id || !user_id) {
    res
      .status(400)
      .json({ message: "You must submit a value id and user id." });
  } else {
    User.addValue(req.body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}`
          });
      });
  }
});

// POST projects
router.post("/:id/projects", (req, res) => {
  const { project_name, user_id } = req.body;

  if (!project_name || !user_id) {
    res
      .status(400)
      .json({ message: "You must submit a project name and user id." });
  } else {
    User.addProject(req.body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}`
          });
      });
  }
});
// POST journal
router.post("/:id/journal", (req, res) => {
  const { journal_entry, user_id } = req.body;

  if (!journal_entry || !user_id) {
    res
      .status(400)
      .json({ message: "You must submit a journal entry and user id." });
  } else {
    User.addJournal(req.body)
      .then(journal => {
        res.status(201).json(journal);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}`
          });
      });
  }
});

// PUT values

// PUT projects
router.put("/:id/projects", (req, res) => {
  const { project_name, id } = req.body;

  if (!project_name || !id) {
    res
      .status(400)
      .json({ message: "You must submit a project name and project id." });
  } else {
    User.updateProject(id, req.body)
      .then(updated => {
        if (updated === 1) {
          return User.getProjectById(id).then(project => {
            res.status(201).json(project);
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}`
          });
      });
  }
});

// PUT journal
router.put("/:id/journal", (req, res) => {
  const { journal_entry, user_id } = req.body;

  if (!journal_entry || !user_id) {
    res
      .status(400)
      .json({ message: "You must submit a journal entry and user id." });
  } else {
    User.updateJournal(user_id, req.body)
      .then(updated => {
        if (updated === 1) {
          return User.getUserJournalByUserId(user_id).then(updates => {
            let [journal] = updates;
            res.status(201).json(journal);
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: `SQLite Error ${err.errno}: ${dbErrors[err.errno]}`
          });
      });
  }
});

module.exports = router;
