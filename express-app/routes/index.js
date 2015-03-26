var express = require('express');
var timeline = require('../timeline');
var fileWalker = require('../file-walker');
var router = express.Router();
var GitHubApi = require('github');
//var gith = require('gith').create(9001);

var github = new GitHubApi({
	version: "3.0.0"
});

router.get('/testman', function(req, res) {
  res.json({name: "David"});
});
router.post('/file_update', function(req, res) {
  console.log("GOT", req);
  res.send(200);
})

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/chat', function (req, res){
	res.render('chat.ejs');
});

router.post("/login", function (req, res, next) {
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
	}, function (err, data) {
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
  fileWalker(process.cwd())
})

router.get('/chat', function(req, res) {
  res.render('chat.ejs');
})






module.exports = router;
