const express = require('express');
const router = express.Router();
const user = require('../database/Users/models')
const bycrpt = require("bcrypt");



router.post('/register' ,(req, res) => {
  let userbody = req.body;
   userbody.password = bycrpt.hashSync(userbody.password, 15);
    user.add(userbody)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error)
    })
});


module.exports = router;