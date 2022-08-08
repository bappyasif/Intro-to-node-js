var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// test route
router.get('/cool/', function(req, res, next) {
  res.send("you are sooo coool");
});

module.exports = router;
