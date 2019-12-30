const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const Movements = mongoose.model('movement', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99
    },     
    preDefined: {
        type: Boolean,
        required: true
    }
}))

function validateMovementJoi(movement){
    const schema = {
        name: Joi.string().min(1).max(99).required(), 
        type: Joi.string().min(1).max(99).required(),       
        preDefined: Joi.bool().required()        
    };
   // console.log(movement)
    return Joi.validate(movement, schema);
}

exports.Movements = Movements;
exports.validate = validateMovementJoi;