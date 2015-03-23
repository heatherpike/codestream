var express = require('express');
var router = express.Router();
var GitHubApi = require('github');
//var gith = require('gith').create(9001);

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
			url: "http://codestream.co",
			content_type: "json",
			secret: "codestream"
		},
		events: ['push'],
		active: true
	}, function (err, data) {
		if (err) next(err);
		//store repo name and owner name in DB
		res.end();
	});
});

	// github.gitdata.getReference({
	// 	user: req.body.username,
	// 	repo: req.body.repository,
	// 	ref: "heads/master"
	// }, function (err, data) {
	// 	github.gitdata.getTree({
	// 		user: req.body.username,
	// 		repo: req.body.repository,
	// 		sha: data.object.sha,
	// 		recursive: true
	// 	}, function (err, data) {
	// 		console.log(data);
	// 		res.end();	
	// 	})

	// });
		// gith({
		// 	repo: req.body.repository
		// }).on('all', function (payload) {
		// 	console.log(payload);
		// });


module.exports = router;
