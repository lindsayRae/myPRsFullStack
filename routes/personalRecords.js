const { PersonalRecord } = require('../models/personalRecord');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();


// function getDate() {
//     let date = new Date();
//     let month = date.getMonth() + 1;
//     let day = date.getDate();
//     let year = date.getFullYear();
//     let today = month.toString() + "-" + day.toString() + "-" + year.toString();
//     return today;
// }


//? Get movement by user_id 
router.get('/:id', auth, async (req, res) => {
  
    try {
       
        let id = req.params.id;
        let movement = req.query.movement;  
        let record = await PersonalRecord.findOne({ user_id: id}); 
        console.log("record below")
        console.log(record)
        if (record == null){
            console.log('record is null')
           return res.status(404).send({record: [], message: 'There are not any user defined lifts for this user'});
           //res.send({record: [], message: 'There are not any user defined lifts for this user'})
        } else if (movement === 'lift') {
            res.send(record.lifts)
        } else if (movement === 'cardio') {            
            res.send(record.cardio)
        } else if (movement === 'skill') {
            res.send(record.skills)
        } else {
            res.send({message: 'Something went wrong'})
        }
   
    } catch (error) {
        res.send(error);
    }
})

//? Create new MOVEMENT with a PR
router.post('/:movement', auth, async (req, res) => {
   
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
        } else if (movement === 'lift') {           
            record.lifts.push(pr)
        } else if (movement === 'cardio') {
            record.cardio.push(pr)
        } else if (movement === 'skill') {
            record.skills.push(pr)
        }

        let result = await record.save(pr);
        res.send({ message: "Success", results: result })

    } catch (error) {
        res.send(error);
    }
})


//? Called in create new user to set up empty PRs
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
        let result = await personalRecord.save()
        
        res.send(result)

    } catch (error) {
        res.send(error);
    }
})

//? Edit one entry 
router.put('/:id', auth, async (req, res) => {
   
    try {
      
        let id = req.params.id;
        let prID = req.body.prID;

        let name = req.body.name;
        let date = req.body.date;
        let personalRecord = req.body.personalRecord;
        let comment = req.body.comment;
        let type = req.body.type
        let record;

        if(type === 'lift'){
            record = await PersonalRecord.updateOne({user_id: id, 'lifts._id': prID}, 
            {$set : {
                'lifts.$.name': name,
                'lifts.$.date': date, 
                'lifts.$.personalRecord': personalRecord, 
                'lifts.$.comment': comment                   
             } });
        } else if(type === 'cardio'){
            record = await PersonalRecord.updateOne({user_id: id, 'cardio._id': prID}, 
            {$set : {
                'cardio.$.name': name,
                'cardio.$.date': date, 
                'cardio.$.personalRecord': personalRecord, 
                'cardio.$.comment': comment                   
             } });
        } else if(type === 'skill'){
            record = await PersonalRecord.updateOne({user_id: id, 'skills._id': prID}, 
            {$set : {
                'skills.$.name': name,
                'skills.$.date': date, 
                'skills.$.personalRecord': personalRecord, 
                'skills.$.comment': comment                   
             } });
        } 
                 
       res.send(record);
                 
    } catch (error) {
        res.send(error);
    }
})


//? Delete one entry  
    router.delete('/:id', auth, async (req, res) => {
   
        try {       

            let movement = req.body.type
            let id = req.params.id;
            let prID = req.body.prID;  
            let subRecord

            let record = await PersonalRecord.findOne({ user_id: id});
            
            if (movement === 'lift') {            
                subRecord = record.lifts.id(prID)          
            } 
            else if (movement === 'cardio') {
                subRecord = record.cardio.id(prID)   
            } 
            else if (movement === 'skill') {                
                subRecord = record.skills.id(prID)                
            } 

            let result = subRecord.remove();
            
            record.save()
            res.send({removed: true});
                          
    
        } catch (error) {
            res.send(error);
        }
    })


module.exports = router;