var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pancake', { title: 'Search Results for pancakes' });
});

module.exports = router;