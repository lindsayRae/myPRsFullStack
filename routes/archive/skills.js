var express = require('express');
var router = express.Router();



/* GET skills listing. */
router.get('/', function(req, res, next) {
    res.send(skills);
  });

module.exports = router;