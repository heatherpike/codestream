var express = require('express');
var timeline = require('../timeline');
var fileWalker = require('../file-walker');
var router = express.Router();
var GitHubApi = require('github');
var gift = require('gift');
var models = require('../models/');
//var gith = require('gith').create(9001);

var github = new GitHubApi({
	version: "3.0.0"
});

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
    // chop of /hooks/[hook_id] from url to get repo api url
    var githubUrl = data.url.split(/\/hooks\/[0-9]+$/)[0];
    var newRepo = new model.Repo({
                               name: req.body.repository,
                               githubUrl: githubUrl,
                               userId: 'please integrate me with passport!'});
    gift.clone('git@github.com:'+req.body.username+'/'+req.body.repository+'.git', 
               '../repos/'+repo._id, 
               function(err, _repo) {
                 if(err) console.log(err);
                 else {
                   newRepo.save(function(err) {
                     if(err) console.log(err);
                   });
                 }
               });
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
