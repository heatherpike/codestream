var express = require('express');
var timeline = require('../timeline');
var fileWalker = require('../file-walker');
var router = express.Router();
var GitHubApi = require('github');
//var gith = require('gith').create(9001);

var github = new GitHubApi({
  version: "3.0.0"
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post("/login", function(req, res, next) {
  console.log(req.body);
  github.authenticate({
    type: 'basic',
    username: req.body.username,
    password: req.body.password
  });

  github.repos.createHook({
    user: req.body.username,
    repo: req.body.repository,
    name: "web",
    config: {
      url: "http://codestream.co",
      content_type: "json",
      secret: "codestream"
    },
    events: ['push'],
    active: true
  }, function(err, data) {
    if (err) console.log(err);
    res.end();
  });
});

router.get('/commits', function(req, res) {
  timeline(function(commits) {
    res.send(commits);
  });
});

router.get('/filetree', function(req, res) {
  // console.log('filewalker', fileWalker);
  res.send(fileWalker(process.cwd()));
})


module.exports = router;