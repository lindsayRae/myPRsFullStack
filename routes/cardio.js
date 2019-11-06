const { Cardio, validate } = require('../models/cardio');
const express = require('express');
const router = express.Router();


/* GET cardio listing. */
router.get('/', async (req, res) => {
    const cardio = await Cardio.find();
    res.send(cardio);
  });

router.post('/', async(req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let cardio = new Cardio ({ 
        name: req.body.name,
        description: req.body.description       
    })
    cardio = await cardio.save();

    res.send(cardio);
})


module.exports = router;