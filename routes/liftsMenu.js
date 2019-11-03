let express = require('express');
let router = express.Router();
let getLiftsMenu = require('../models/liftsMenu')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Welcome to Lifts Menu Route");
});

router.get('/:id', function (req, res, next) {
  let user_id = req.params.id
  user_id = Number(user_id)
  let liftsMenu = getLiftsMenu(user_id)
  res.send(liftsMenu)
})

module.exports = router;