var express = require('express');
var timeline = require('../timeline');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/commits', function(req, res) {
  timeline(function(commits) {
    res.send(commits);
  });
});

router.get('/chat', function(req, res) {
  res.render('chat.ejs');
})

module.exports = router;