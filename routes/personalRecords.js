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
  //console.log('heard the GET')
    try {
       
    const id = req.params.id;
    const movement = req.query.movement;    

  
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
//? Create new MOVEMENT with a PR
//! added auth as middleware
//router.post('/', auth, async (req, res) => {
router.post('/:movement', async (req, res) => {
   
    try {
        let movement = req.params.movement        
        let id = req.body.user_id 

        let pr = {
            name: req.body.name,          
            preDefined: req.body.preDefined,
            type: req.body.type,
            date: req.body.date,
            comment: req.body.comment,
            personalRecord: req.body.personalRecord
        }     
        
    
        let record = await PersonalRecord.findOne({ user_id: id});  
            
        if(!record){
            res.send({ message: "Did not find a record for this user"});
        } else if (movement === 'lifts') {
            console.log("push to the lift array")
            record.lifts.push(pr)
        } else if (movement === 'cardio') {
            record.cardio.push(pr)
        } else if (movement === 'skills') {
            record.skills.push(pr)
        }

        let result = await record.save(pr);
        res.send({ message: "Success", results: result })

    } catch (error) {
        res.send(error);
    }
})

// //? Create new PR for exisiting movement
// //? need to grab the description and preDefined values to pass to new entry 
// //! LINDSAY START HERE!
// //! added auth as middleware
// //router.post('/', auth, async (req, res) => {
//     router.post('/newpr/:movement', async (req, res) => {
//     console.log('made it..................')
//         try {
//             let movement = req.params.movement 
//            // let name = req.body.name       
//             let id = req.body.user_id   
            
            
//             let record = await PersonalRecord.findOne({ user_id: id});  
//                 console.log(record)
                
//             let currentArr = record.lifts;
//             console.log('*************')
//             console.log(currentArr)
//             //! loop through array of objects and return the object that matches a condition 

            
//             //? if record[i].name === name req.params.name
//                 //? get the 
//                     //? req.body.name
//                     //? record[i].description
//                     //? record[i].preDefined                
//                     //? req.body.date
//                     //? req.body.comment
//                     //? req.body.personalRecord

//                 res.send({ message: "Success", results: record })

//                 // let pr = {
//                 //     name: req.body.name,
//                 //     description: req.body.description,
//                 //     preDefined: req.body.preDefined,
//                 //     date: req.body.date,
//                 //     comment: req.body.comment,
//                 //     personalRecord: req.body.personalRecord
//                 // }        
                


//             // if(!record){
//             //     console.log('did not find a record for this user')
//             // } else if (movement === 'lifts') {
//             //     console.log("push to the lift array")
//             //     record.lifts.push(pr)
//             // } else if (movement === 'cardio') {
//             //     record.cardio.push(pr)
//             // } else if (movement === 'skills') {
//             //     record.skills.push(pr)
//             // }
    
//             // let result = await record.save(pr);
//             // res.send({ message: "Success", results: result })
    
//         } catch (error) {
//             res.send(error);
//         }
//     })
//! DONE
router.post( '/usersetup/:id' , async (req, res) =>{
    
    try {
        
        let user_id = req.params.id
        let newUserEntry = {
            user_id: user_id,
            lifts: [],
            cardio: [],
            skills: []
        }
      
        let personalRecord = new PersonalRecord(newUserEntry)      

        let result = await personalRecord.save();
        console.log(result)
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