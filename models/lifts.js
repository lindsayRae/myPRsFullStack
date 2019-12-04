const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const Lifts = mongoose.model('Lifts', new mongoose.Schema({
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
        type: Boolean,
        required: true
    }
}))

function validateLiftJoi(lift){
    const schema = {
        name: Joi.string().min(1).max(99).required(),
        description: Joi.string().min(1).max(99).required(),
        preDefined: Joi.bool().required()        
    };
    return Joi.validate(lift, schema);
}

exports.Lifts = Lifts;
exports.validate = validateLiftJoi;