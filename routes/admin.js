const { Movements, validate } = require('../models/movement');

const express = require('express');
const router = express.Router();

//! creates preDefined Movements for the DB 
//! ONLY for the developer 
router.post('/addmovement', async (req, res) => {
    
    let body = {
        name: req.body.name,
        type: req.body.type,
        preDefined: req.body.preDefined
    }

    try {
      
        let validated = validate(body);
        console.log(validated)
        if (validated.error) {
            let errorMsg = validated.error.details[0].message
            return res.status(400).send(errorMsg);
        } 

        let movement = new Movements({
            name: req.body.name,
            type: req.body.type,
            preDefined: req.body.preDefined
        })
       
        let result = await movement.save()       
        res.send(result)

    } catch (error) {
        console.log('In catch')
        console.log(error)
        //return res.status(400).send(ex.errors.message);
    }
});


module.exports = router;