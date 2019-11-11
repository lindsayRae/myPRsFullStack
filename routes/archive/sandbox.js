
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Welcome to the sandbox Endpoint')
})


//* Example using route params 
router.post('/', async (req, res) => {

    try {
        let user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        }

        res.send(user)

    } catch (error) {
        res.send(error)
    }
})

//* Example using query string params 
router.put('/routeparam/:parent_id', async(req, res) => {
    try {
        
        let parent = req.params.parent_id        
        res.send(parent)


    } catch (error) {
        
    }
})

//* Example using query string params 
router.get('/queryparam', async(req, res) => {
    try {
        
        let age = req.query.age        
        res.send(age)


    } catch (error) {
        
    }
})



module.exports = router;


