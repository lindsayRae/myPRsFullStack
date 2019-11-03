const Joi = require('@hapi/joi');

var express = require('express');
var router = express.Router();

const lifts = [
    {
        id: 1,
        name: "Back Squat - 1 Rep",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        maxLog: [
            {
                date: "01-01-2019",
                weight: "100 lbs"
            },
            {
                date: "02-01-2019",
                weight: "110 lbs"
            },
            {
                date: "03-01-2019",
                weight: "130 lbs"
            },
            {
                date: "04-01-2019",
                weight: "160 lbs"
            },
        ]    
    },
    {
        id: 2,
        name: "Bench Press - 1 Rep",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        maxLog: [
            {
                date: "01-01-2019",
                weight: "100 lbs"
            },
            {
                date: "02-01-2019",
                weight: "110 lbs"
            },
            {
                date: "03-01-2019",
                weight: "130 lbs"
            },
            {
                date: "04-01-2019",
                weight: "160 lbs"
            },
        ]    
    },
    {
        id: 3,
        name: "Clean - 1 Rep",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        maxLog: [
            {
                date: "01-01-2019",
                weight: "100 lbs"
            },
            {
                date: "02-01-2019",
                weight: "110 lbs"
            },
            {
                date: "03-01-2019",
                weight: "130 lbs"
            },
            {
                date: "04-01-2019",
                weight: "160 lbs"
            },
        ]    
    },
    {
        id: 4,
        name: "Clean & Jerk - 1 Rep",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        maxLog: [
            {
                date: "01-01-2019",
                weight: "100 lbs"
            },
            {
                date: "02-01-2019",
                weight: "110 lbs"
            },
            {
                date: "03-01-2019",
                weight: "130 lbs"
            },
            {
                date: "04-01-2019",
                weight: "160 lbs"
            },
        ]    
    }
]

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