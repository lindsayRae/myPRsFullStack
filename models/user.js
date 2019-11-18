const config = require('config');
const jwt = require('jsonwebtoken'); 
const Joi = require('joi');
const mongoose = require('mongoose');
const jwtPrivateKey = process.env.jwtPrivateKey;

const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99               
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99               
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true        
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024               
    }
});

userSchema.methods.generateAuthToken = function(){
  //  console.log(jwtPrivateKey)
    const token = jwt.sign({_id: this._id }, jwtPrivateKey);
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        firstName: Joi.string().min(1).max(99).required(),
        lastName: Joi.string().min(1).max(99).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;