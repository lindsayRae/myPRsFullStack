const { Movements, validate } = require('../models/movement');
const Joi = require('@hapi/joi');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();



//? get default movements
router.get('/:type', auth, async function (req, res) {
    
    let type = req.params.type;   
    console.log(type) 
    // need to only get the the subdoc where type = type
    const movements = await Movements.find({ type: type });  
    res.send(movements);   
});


//! DON'T THINK I AM USING THE BELOW VERIFY THEN ARCHIVE 1-8-20
// router.get('/:id', (req, res) => {
//     console.log(req.params.id)
//     let lift = lifts.find(g => g.id === parseInt(req.params.id));
//     if (!lift) return res.status(404).send('The lift with the given ID was not found');
//     res.send(lift);
// });



// router.put('/:id', (req, res) => {

//     let lift = lifts.find(l => l.id === parseInt(req.params.id));
//     if (!lift) return res.status(404).send('The lift with the given ID was not found');

//     let {
//         error
//     } = validateNewEntry(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let entries = lift.maxLog;

//     entries.push({
//         date: req.body.date = new Date(),
//         weight: req.body.weight
//     })
//     res.send(entries)
// });

// router.delete('/:id', (req, res) => {

//     let lift = lifts.find(l => l.id === parseInt(req.params.id));
//     if (!lift) return res.status(404).send('The lift with the given ID was not found');

//     let index = lifts.indexOf(lift);
//     lifts.splice(index, 1);

//     res.send(lift);
// });


function validateNewEntry(lift) {
    const schema = {
        weight: Joi.string().required()
    };
    return Joi.validate(lift, schema);
}

module.exports = router;