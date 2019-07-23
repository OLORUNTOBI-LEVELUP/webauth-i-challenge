const express = require("express");
const router = express.Router();
const user = require("../database/Users/models");
const bycrpt = require("bcrypt");

router.post("/login", validateUser, validateLogin, (req, res) => {
  const user = req.session.user;
  try {
    res.status(200).json({ message: `Welcome ${user.username}! You have been successfully signed in` });
  } catch (error) {
    res
      .status(500)
      .json("You shall not pass");
  }
});

function validateUser(req, res, next) {
  if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
    if (req.body.username && req.body.password) {
      next();
    } else {
      res
        .status(400)
        .json({
          message:
            "You are missing the required username and/or password fields"
        });
    }
  } else {
    res
      .status(400)
      .json({ message: "user data missing" });
  }
}

function validateLogin(req, res, next) {
  let { username, password } = req.body;
  user.findBy({ username })
    .first()
    .then(user => {
      if (user && bycrpt.compareSync(password, user.password)) {
        req.session.user = user;
        next();
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(() => {
      res.status(401).json({ message: "Invalid Credentials" });
    });
}

module.exports = router;
