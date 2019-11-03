let express = require('express');
let router = express.Router();
let getSkillsMenu = require('../models/skillsMenu')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Welcome to Skills Menu Route");
});

router.get('/:id', function (req, res, next) {
  let user_id = req.params.id
  user_id = Number(user_id)
  let skillsMenu = getSkillsMenu(user_id)
  res.send(skillsMenu)
})

module.exports = router;