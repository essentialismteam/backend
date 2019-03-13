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
        .json({ message: "There was an error retrieving the users." });
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
        .json({ message: "There was an error retrieving user information." });
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
        res.status(500).json({
          message: "There was an error adding the value."
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
        res.status(500).json({
          message: "There was an error adding the project."
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
        res.status(500).json({
          message: "There was an error adding the journal entry."
        });
      });
  }
});

// PUT values
router.put("/:id/values", (req, res) => {
  const { old_value_id, value_id, user_id } = req.body;

  if (!old_value_id || !value_id || !user_id) {
    res
      .status(400)
      .json("You must submit an old value id, new value id, and user id.");
  } else {
    User.getUserValueByValueId(old_value_id, user_id)
      .then(value => {
        if (value) {
          User.updateValue(old_value_id, user_id, value_id).then(updated => {
            if (updated > 0) {
              return User.getValueById(value_id).then(newValue => {
                res.status(200).json(newValue);
              });
            }
          });
        } else {
          res.status(404).json({
            message:
              "The user has not previously specified this value as a priority."
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error updating the user's value." });
      });
  }
});

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
        if (updated > 0) {
          return User.getProjectById(id).then(project => {
            res.status(201).json(project);
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error updating the project."
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
        if (updated > 0) {
          return User.getUserJournalByUserId(user_id).then(updates => {
            let [journal] = updates;
            res.status(201).json(journal);
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error updating the journal entry."
        });
      });
  }
});

// DELETE projects
router.delete("/:id/projects", (req, res) => {
  let { id } = req.body;

  if (!id) {
    res.status(400).json({ message: "You must submit a project id." });
  } else {
    User.deleteProject(id)
      .then(deleted => {
        if (deleted > 0) {
          res
            .status(200)
            .json({ message: "The project has been successfully deleted." });
        } else {
          res.status(404).json({ message: "That project id does not exist." });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error deleting the project." });
      });
  }
});

// DELETE journal
router.delete("/:id/journal", (req, res) => {
  let { id } = req.params;

  User.deleteJournal(id)
    .then(deleted => {
      if (deleted > 0) {
        return res
          .status(200)
          .json({ message: "The journal entry has been deleted." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error deleting the journal entry." });
    });
});

// DELETE values
router.delete("/users/:id/values", (req, res) => {});

module.exports = router;
