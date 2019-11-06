const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
  const user = await User.find();
  res.send(user);
});

//! Below I added salt and hash for password protection in th DB 
router.post('/', async (req, res) => {
  
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User is already registered.');

    user = new User(_.pick(req.body, ['screenName', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  
    //* pick what you want returned back to the user 
    res.send(_.pick(user, ['screenName', 'email']));
 
});

module.exports = router;
