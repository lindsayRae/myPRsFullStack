//const config = require('config');
//const jwt = require('jsonwebtoken'); 
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
//const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const user = await User.find();
  res.send(user);
});

//? Login endpoint 
router.post('/', async (req, res) => {
  console.log('in login post')
  console.log(req.body)
    const { error } = validate(req.body);
    if (error) {
      // ! This error is generated when your validate function at the bottom of 
      // ! the page is not satisfied
      return res.status(400).send({
          message: 'Usernames and passwords, should be at least 5 characters long'
        });
    } 

    // ! We are looking to see if the email address is in the database
    let user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
      // ! If the user is not in the database we will send back a 404 (not found)
      return res.status(400).send({
        message: 'Invalid username or password.'
      });
    } 

   //* compare plain text pw with hash pw
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) {
     // ! If the user is in the data, but the password bad, 
     // ! it's an invalid request (400 status code)
    return res.status(400).send({
      message: 'Invalid username or password.'
    });
   }

   const token = user.generateAuthToken();
   const id =  user._id;
   console.log("past token")
   console.log(id)
   console.log(token)
   res.send({token: token, id: id});
     
});


function validate(req){
    const schema = {        
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);
}


module.exports = router;
