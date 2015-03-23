var express = require('express');
var timeline = require('../timeline');
var fileWalker = require('../file-walker');
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

router.get('/filetree', function(req, res) {
  console.log('filewalker', fileWalker);
  res.send(fileWalker(process.cwd()));
})

router.get('/chat', function(req, res) {
  res.render('chat.ejs');
})

module.exports = router;