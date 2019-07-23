const router = require('express').Router();

const users = require('../database/Users/models')
const restricted = require('./restricted');

router.get('/users', restricted, (req, res) => {
  users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
