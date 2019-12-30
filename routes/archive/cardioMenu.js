let express = require('express');
let router = express.Router();
let getCardioMenu = require('../../models/archive/cardioMenu')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Welcome to Cardio Menu Route");
});

router.get('/:id', function (req, res, next) {
  let user_id = req.params.id
  user_id = Number(user_id)
  let cardioMenu = getCardioMenu(user_id)
  res.send(cardioMenu)
})

module.exports = router;