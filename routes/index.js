var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
  res.render('index');
})

// Get Random image page

router.get('/randomly', function(req, res){
  res.render('randomly');
})

module.exports = router;
