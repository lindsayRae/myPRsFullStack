const auth = require('../middleware/auth');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {
  User,
  validate
} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//! NOTE: to log out user
//! need to be handled on the client, just delete the token because we are not storing the 'generateAuthToken' anywhere on the server

router.get('/', async (req, res) => {
  const user = await User.find();
  res.send(user);
});

//? get user by ID
router.get('/me/:id', auth, async (req, res) => {

  let id = req.params.id;
  const user = await User.findById(id).select('-password');
  res.send(user);
});

router.get('/:email', async (req, res) => {

  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  //! Lindsay create separate validation 
  let user = await User.findOne({
    email: req.params.email
  })
  res.send(user);
})

//? Create new user 
//! Below I added salt and hash for password protection in th DB 
router.post('/', async (req, res) => {
  
  const { error } = validate(req.body);
  if (error) {
    
    return res.status(400).send({
      message: error.details[0].message
    });
  }
  
  let user = await User.findOne({
    email: req.body.email
  });
  if (user) {
    return res.status(400).send({
      message: 'User is already registered.'
    });
  }
  
  user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  let newUser = await user.save();  

  if (!newUser) {
    return res.status(500).send("There was a problem creating your user, please try again later")
  } else {
    const token = user.generateAuthToken();

    //* pick what you want returned back to the user     
    //! you will need to create a header for the creation of the blank you document in personalRecord

    res.header('x-auth-token', token).send( {_id: user._id, token: token} );
    // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email'] ) );

    let headers = {
      "Content-Type": "application/json",
    }

    //! Call out to your existing endpoint to create a new PR record with empty arrays (lifts, cardio, skills)
    let baseURL = req.headers.host
    let url = ""

    const env = process.env.APP_ENV;

    if(env === "DEV"){
      url = `http://${baseURL}/api/personalrecord/usersetup/${newUser._id}`;
    } else {
      url = `https://${baseURL}/api/personalrecord/usersetup/${newUser._id}`;
    }
 
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: headers
      })
  
      let json = await response.json()
      
    } catch (error) {
      
      console.log(error)
    }

    
  }
});

//? update user
router.put('/me/:id', auth, async (req, res) => {
  // validation need to come here for post body

  let user = await User.findByIdAndUpdate(req.params.id,
    { 
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }, { new: true });

    if (!user) return res.status(404).send('The user with the given ID was not found.');
    
    res.send({results: "The user has been updated.", user: user});
})
module.exports = router;