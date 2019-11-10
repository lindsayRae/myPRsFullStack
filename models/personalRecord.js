const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const MovementSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 99
        },
        preDefined: {
            type: Boolean,
            required: true            
        },
        date: {
            required: true,
            trim: true,
            type: String,
            maxlength: 999
        },
        comment: {
            type: String,
            required: false,
            minlength: 1,
            maxlength: 999
        },
        personalRecord: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 99
        }

})

const PersonalRecordSchema = new mongoose.Schema({
        user_id: {
            type: String,
            required: true,
            minlength: 24,
            maxlength: 24
        },
        skills: [MovementSchema],
        lifts: [MovementSchema],
        cardio: [MovementSchema],
})

const PersonalRecord = mongoose.model('PersonalRecord', PersonalRecordSchema)

exports.PersonalRecord = PersonalRecord;