var express = require('express');
var router = express.Router();


const skills = [
    {
        id: "doubleUnder",
        name: "Double Unders Unbroken",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        maxLog: [
            {
                date: "01-01-2019",
                count: 30
            },
            {
                date: "02-01-2019",
                count: 40
            },
            {
                date: "03-01-2019",
                count: 50
            },
            {
                date: "04-01-2019",
                count: 60
            },
        ]    
    },
    {
        id: "pullUps",
        name: "Pull Ups",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        maxLog: [
            {
                date: "01-01-2019",
                count: 1
            },
            {
                date: "02-01-2019",
                count: 2
            },
            {
                date: "03-01-2019",
                count: 3
            },
            {
                date: "04-01-2019",
                count: 4
            },
        ]    
    },
    {
        id: "chinUps",
        name: "Chin Ups",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        maxLog: [
            {
                date: "01-01-2019",
                count: 1
            },
            {
                date: "02-01-2019",
                count: 2
            },
            {
                date: "03-01-2019",
                count: 3
            },
            {
                date: "04-01-2019",
                count: 4
            },
        ]    
    },
    {
        id: "kippingHSPUs",
        name: "Kipping Handstand Pushups",
        maxLog: [
            {
                date: "01-01-2019",
                count: 1
            },
            {
                date: "02-01-2019",
                count: 2
            },
            {
                date: "03-01-2019",
                count: 3
            },
            {
                date: "04-01-2019",
                count: 4
            },
        ]    
    },
    {
        id: "strictHSPUs",
        name: "Strict Handstand Pushups",
        maxLog: [
            {
                date: "01-01-2019",
                count: 1
            },
            {
                date: "02-01-2019",
                count: 2
            },
            {
                date: "03-01-2019",
                count: 3
            },
            {
                date: "04-01-2019",
                count: 4
            },
        ]    
    },
    {
        id: "pushUps",
        name: "Push Ups",
        maxLog: [
            {
                date: "01-01-2019",
                count: 1
            },
            {
                date: "02-01-2019",
                count: 2
            },
            {
                date: "03-01-2019",
                count: 3
            },
            {
                date: "04-01-2019",
                count: 4
            },
        ]    
    }
]

/* GET skills listing. */
router.get('/', function(req, res, next) {
    res.send(skills);
  });

module.exports = router;