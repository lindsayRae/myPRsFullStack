const Joi = require('@hapi/joi');

const express = require('express');
const router = express.Router();



/* GET lifts listing. */
router.get('/', function(req, res, next) {
    res.send(lifts);
  });

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    let lift = lifts.find(g => g.id === parseInt(req.params.id));
    if (!lift) return res.status(404).send('The lift with the given ID was not found');
    res.send(lift);
});

router.post('/', (req, res) => {

    let { error } = validateLift(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let lift = {
        id: lifts.length + 1,
        name: req.body.name, 
        description: req.body.description,       
        maxLog: [
            { 
                weight: req.body.weight 
            }
        ]      
    }

    lifts.push(lift);
    res.send(lift)

});

router.put('/:id', (req, res) => { 
    
    let lift = lifts.find(l => l.id === parseInt(req.params.id));    
    if (!lift) return res.status(404).send('The lift with the given ID was not found');

    let { error } = validateNewEntry(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let entries = lift.maxLog;

    entries.push({date: req.body.date = new Date(), weight: req.body.weight })
    res.send(entries)
});

router.delete('/:id', (req, res) => {
    
    let lift = lifts.find(l => l.id === parseInt(req.params.id));    
    if (!lift) return res.status(404).send('The lift with the given ID was not found');

    let index = lifts.indexOf(lift);
    lifts.splice(index, 1);

    res.send(lift);
});


function validateLift(lift){
    const schema = {
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        name: Joi.string().min(3).required(),
        weight: Joi.string().required()       
    };
    return Joi.validate(lift, schema);
}

function validateNewEntry(lift){
    const schema = {        
        weight: Joi.string().required()       
    };
    return Joi.validate(lift, schema);
}

module.exports = router;