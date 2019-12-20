const { PersonalRecord } = require('../models/personalRecord');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Welcome to Personal Records Endpoint')
})

function getDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let today = month.toString() + "-" + day.toString() + "-" + year.toString();
    return today;
}

//? get entries for 1 movement
//! Added auth as middlerware 
// router.get('/:id', auth, async (req, res) => {
  
//     try {
       
//     const id = req.params.id;
//     const movement = req.query.movement;
//     let record = await PersonalRecord.findById(id);

//     if (movement === 'lifts') {
//         res.send(record.lifts)
//     } else if (movement === 'cardio') {
//         res.send(record.cardio)
//     } else if (movement === 'skills') {
//         res.send(record.skills)
//     }

//     } catch (error) {
//         res.send(error);
//     }
// })


//? Get lifts by user_id WORKING! 
//! No authorization 
router.get('/:id', async (req, res) => {
  console.log('heard the GET')
    try {
       
    const id = req.params.id;
    const movement = req.query.movement;    

    //! Steven hard coded the "user_id" from personal records collection  or _id user collection
    let record = await PersonalRecord.findOne({ user_id: id});    
    if (!record){
        res.send({record: [], message: 'There are not any user defined lifts for this user'})
    } else if (movement === 'lifts') {
        res.send(record.lifts)
    } else if (movement === 'cardio') {
        res.send(record.cardio)
    } else if (movement === 'skills') {
        res.send(record.skills)
    } else {
        res.send({message: 'Something went wrong'})
    }
   
    } catch (error) {
        res.send(error);
    }
})
//? Create new Personal Record
//! added auth as middleware
//router.post('/', auth, async (req, res) => {
    router.post('/:movement', async (req, res) => {

    try {
        let movement = req.params.movement
        let user_id = req.body.user_id
        let pr = req.body.pr
            pr.date = Date.now()

        let record = await PersonalRecord.findOne({ user_id: user_id});  

        if (movement === 'lifts') {
            record.lifts.push(pr)
        } else if (movement === 'cardio') {
            record.cardio.push(pr)
        } else if (movement === 'skills') {
            record.skills.push(pr)
        }

        let result = await record.save();
        res.send(result)

    } catch (error) {
        res.send(error);
    }
})

//? Add one entry 
//! added auth middleware
//router.put('/:id', auth, async (req, res) => {
router.put('/:id', async (req, res) => {
    console.log('in the PUT to add an entry')
    try {

        const movement = req.body.movement
        const document = req.body.document
        const id = req.params.id

        console.log(movement);
        console.log(document);
        console.log(id);

        let record = await PersonalRecord.findById(id)
        console.log(record)

        let recordToAdd = {
            name: document.name,
            preDefined: false,
            comment: document.comment,
            personalRecord: document.personalRecord,
            date: getDate()
        }

        if (movement === 'lifts') {
            console.log(recordToAdd)
            record.lift.push(recordToAdd)
        } else if (movement === 'cardio') {
            record.cardio.push(recordToAdd)
        } else if (movement === 'skills') {
            record.skills.push(recordToAdd)
        }

        let recordResult = await record.save()
        res.send(recordResult);        

    } catch (error) {
        res.send(error);
    }
})

//? remove one entry 
//! added auth middleware
router.put('/delete/:parent_id', auth, async (req, res) => {
    try {           

        const movement = req.body.movement
        const child_id = req.body.child_id
        const parent_id = req.params.parent_id
        
        let record = await PersonalRecord.findById(parent_id)
        let result 
      
        if (movement === 'lifts') {
            let subRecord = record.lifts.id(child_id)
            result = subRecord.remove();
        } 
        else if (movement === 'cardio') {
            let subRecord = record.cardio.id(child_id)
            result = subRecord.remove();
        } 
        else if (movement === 'skills') {
            let subRecord = record.skills.id(child_id)
            result = subRecord.remove();
        }

        record.save()
        res.send(result)
       
    } catch (error) {
        res.send(error);
    }

})


module.exports = router;