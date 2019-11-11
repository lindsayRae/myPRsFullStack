const { PersonalRecord } = require('../../models/personalRecord');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Welcome to SANDBOX 2')
})

let parent_id = '5dc74414afe1c742f8e0c79f'
let child_id = '5dc74414afe1c742f8e0c7a5'
let movement = 'skills' 


function getDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let today = month.toString() + "-" + day.toString() + "-" + year.toString();
    return today;
}
//? Create new Personal Record log for a new user 
router.post('/add', async (req, res) => {
    try {
        let cardios = req.body.cardio
        let lifts = req.body.lifts
        let skills = req.body.skills
        
        cardios.forEach(cardio => {
            cardio.date = getDate()
        });

        lifts.forEach(lift => {
            lift.date = getDate()
        });

        skills.forEach(skill => {
            skill.date = getDate()
        });

        let PersonalRecordToAdd = new PersonalRecord({
            user_id: req.body.user_id,
            lifts: lifts,
            cardio: cardios,
            skills: skills
        })

        let PersonalRecordToAddResult = await PersonalRecordToAdd.save()
        res.send(PersonalRecordToAddResult)
    } catch (error) {
        res.send(error);
    }
})

// ? If we are going to delete the complete parent record, we should use delete http verb
router.delete('/delete', async (req, res) => {
    try {           

        // ! Steps in Mongo using Mongoose 
        // ! 1. Get a record
        // ! 2. Do some CRUD operation 
        // ! 3. Save the record 
       
        let record = await PersonalRecord.findById(parent_id)
        record.delete()
        record.save()
        res.send(record)
      
    } catch (error) {
        res.send(error);
    }
})

router.put('/deletechild', async (req, res) => {

    try {
       
        let record = await PersonalRecord.findById(parent_id)
        let result 

        if (movement === 'lifts') {
            
        } else if (movement === 'cardio') {
            
        } else if (movement === 'skills') {
            // ! tried - record.skills.findById(child_id) and it did not work for a 
            // ! sub document have do use record.skills.id(child_id)

            result = record.skills.id(child_id).remove()
        }

        // ! This line saves the record back to Mongo
        record.save()
        res.send(result)
        

    } catch (error) {
        res.send(error)
    }
})

//? Add a record to a users Personal Record Log 
router.put('/addchild/:id', async (req, res) => {
    try {

        const movement = req.body.movement
        const document = req.body.document
         const id = req.params.id
         let record = await PersonalRecord.findById(id)
       
        let recordToAdd = {
            name: document.name,
            preDefined: false,
            comment: document.comment,
            personalRecord: document.personalRecord,
            date: getDate()
        }
        
        if (movement === 'lifts') {
            console.log("pushing into lifts...")
            record.lifts.push(recordToAdd)
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

module.exports = router;