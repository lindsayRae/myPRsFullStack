const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const maxLogSchema = new mongoose.Schema({
    entry: {
        type: String,
        required: true,        
    },
    date: {
        type: String,
        required: true
    }
})
const Cardio = mongoose.model('Cardio', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    maxLog: [ maxLogSchema ]
   // maxLog: [ { body: { type: String, required: true }, date: Date }]
}))

function validateCardio(cardio){
    const schema = {
        name: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
        maxLog: Joi.array()
    };
    return Joi.validate(cardio, schema);
}

exports.Cardio = Cardio;
exports.validate = validateCardio;