const { Cardio, validate } = require('../../models/cardio');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const cardio = [
    {
        id: "oneMileRun",
        cardioName: "One Mile Run",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        maxLog: [
            {
                date: "01-01-2019",
                time: "10 Min 30 Seconds"
            },
            {
                date: "02-01-2019",
                time: "9 Min 45 Seconds"
            },
            {
                date: "03-01-2019",
                time: "9 Min 10 Seconds"
            },
            {
                date: "04-01-2019",
                time: "9 Min 0 Seconds"
            },
        ]    
    },
    {
        id: "fiveKRun",
        name: "5 K Run",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        maxLog: [
            {
                date: "01-01-2019",
                time: "30 Min 30 Seconds"
            },
            {
                date: "02-01-2019",
                time: "29 Min 45 Seconds"
            },
            {
                date: "03-01-2019",
                time: "28 Min 10 Seconds"
            },
            {
                date: "04-01-2019",
                time: "25 Min 0 Seconds"
            },
        ]    
    }
]



/* GET cardio listing. */
router.get('/', async (req, res) => {
    const cardio = await Cardio.find().sort('name');
    res.send(cardio);
  });

router.post('/', async(req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let cardio = new Cardio ({ 
        name: req.body.name,
        description: req.body.description,
        maxLog: req.body.maxLog
    })
    cardio = await cardio.save();

    res.send(cardio);
})
//https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const cardio = await Cardio.findByIdAndUpdate(req.params.id, { 
       
        maxLog: req.body.maxLog 
    
    }, {
        new: true  // options object
    })
    
    if (!cardio) return res.status(404).send('The cardio with the given ID was not found'); 

    res.send(cardio);
});

module.exports = router;