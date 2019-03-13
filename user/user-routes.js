const express = require("express");
const bcrypt = require("bcryptjs");

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

// GET user's complete info
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

// PUT user's info
router.put("/:id", (req, res) => {
  let updatedUser = req.body;

  const { id } = req.params;
  updatedUser.id = id;

  if (updatedUser.password) {
    const hash = bcrypt.hashSync(updatedUser.password, 10);
    updatedUser.password = hash;
  };

  User.updateUserInfo(id, updatedUser)
    .then(updated => {
      if (updated > 0) {
        res
          .status(200)
          .json({ message: "The user's info was successfully updated." });
      } else {
        res.status(404).json({ message: "The user's info was not updated." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error updating the user's info." });
    });
});

// POST to user's values
router.post("/:id/values", (req, res) => {
  const { value_id } = req.body;
  const { id } = req.params;

  if (!value_id) {
    res
      .status(400)
      .json({ message: "You must submit a value id." });
  } else {
    req.body.user_id = id;
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

// POST to user's projects
router.post("/:id/projects", (req, res) => {
  const { project_name } = req.body;
  const { id } = req.params;

  if (!project_name) {
    res
      .status(400)
      .json({ message: "You must submit a project name." });
  } else {
    req.body.user_id = id;
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
// POST to user's journal
router.post("/:id/journal", (req, res) => {
  const { journal_entry } = req.body;
  const { id } = req.params;

  if (!journal_entry) {
    res
      .status(400)
      .json({ message: "You must submit a journal entry and user id." });
  } else {
    req.body.user_id = id;
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

// PUT a user's value
router.put("/:id/values", (req, res) => {
  const { old_value_id, value_id } = req.body;
  const { id } = req.params;

  if (!old_value_id || !value_id) {
    res
      .status(400)
      .json("You must submit an old value id and a new value id.");
  } else {
    User.getUserValueByValueId(old_value_id, id)
      .then(value => {
        if (value) {
          User.updateValue(old_value_id, id, value_id).then(updated => {
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

// PUT a user's project
router.put("/:id/projects", (req, res) => {
  const { project_name, id } = req.body;
  let userId = req.params.id;

  if (!project_name || !id) {
    res
      .status(400)
      .json({ message: "You must submit a project name and project id." });
  } else {
    User.getProjectById(id).then(project => {
      if (userId === `${project.user_id}`) {
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
      } else {
        res.status(403).json({ message: "This project id does not belong to this user."})
      }
    })

  }
});

// PUT a user's journal
router.put("/:id/journal", (req, res) => {
  const { journal_entry } = req.body;
  const { id } = req.params;

  if (!journal_entry) {
    res
      .status(400)
      .json({ message: "You must submit a journal entry." });
  } else {
    req.body.user_id = id;
    User.updateJournal(id, req.body)
      .then(updated => {
        if (updated > 0) {
          return User.getUserJournalByUserId(id).then(updates => {
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

// DELETE a user's project
router.delete("/:id/projects", (req, res) => {
  let { id } = req.body;
  let userId = req.params.id;

  if (!id) {
    res.status(400).json({ message: "You must submit a project id." });
  } else {
    User.getProjectById(id).then(project => {
      if (userId === `${project.user_id}`) {
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
      } else {
        res.status(403).json({ message: "This project id does not belong to this user."})
      }
    })

  }
});

// DELETE a user's journal
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

// DELETE a user's value
router.delete("/:id/values", (req, res) => {
  const { value_id } = req.body;
  const { id } = req.params;

  if (!value_id) {
    res
      .status(400)
      .json({ message: "You must submit a value id and user id." });
  } else {
    User.deleteUserValue(value_id, id)
      .then(deleted => {
        if (deleted > 0) {
          return res
            .status(200)
            .json({ message: "The user's value has been deleted." });
        } else {
          res
            .status(404)
            .json({
              message:
                "The user has not designated that value id as one of their values."
            });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error deleted the user's value." });
      });
  }
});

module.exports = router;
