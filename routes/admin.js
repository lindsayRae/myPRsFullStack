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
    console.log("body sending: ")
    console.log(body)

    try {
      
        let validated = validate(body);
        console.log("body validated")
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
        console.log("movement: ")
       console.log(movement)
        let result = await movement.save() 
        console.log("result: ")
        console.log(result)   
        res.send(result)

    } catch (error) {
        console.log('In catch')
        console.log(error)
        //return res.status(400).send(ex.errors.message);
    }
});


module.exports = router;