var express = require('express');
var router = express.Router();
var GitHubApi = require('github');

var github = new GitHubApi({
	version: "3.0.0"
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', function (req, res){
	res.render('chat.ejs');
});

router.post("/login", function (req, res, next) {
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
			url: "codestream.co",
			content_type: "json",
			secret: "codestream"
		},
		events: ['push'],
		active: true
	}, function (err, data) {
		console.log(err);
		console.log(data);
		res.end();
	});
});

module.exports = router;
