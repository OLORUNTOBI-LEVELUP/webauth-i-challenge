const express = require('express');
const router = express.Router();
const user = require('../database/Users/models')
const bycrpt = require("bcrypt");
const joi = require('joi');


router.post('/login', (req, res) => {
  
    let { username, password} = req.body
    user.findBy({ username })
    .first()
    .then(user => {
      if (user && bycrpt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}! You are succesfully logged in` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

function validateUser(req, res, next){
    const schema = {
        username: joi.string().min(5).max(50).required(),
        password: joi.string().min(5).max(255).required()
    }
    return joi.validate(req, schema);
    
    }
    
    module.exports = router;