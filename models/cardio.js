const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const Cardio = mongoose.model('Cardio', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    preDefined: {
        type: Boolean
    }
}))

function validateCardio(cardio){
    const schema = {
        name: Joi.string().min(1).max(99).required(),
        description: Joi.string().min(1).max(99).required(),
        preDefined: Joi.bool()         
    };
    return Joi.validate(cardio, schema);
}

exports.Cardio = Cardio;
exports.validate = validateCardio;