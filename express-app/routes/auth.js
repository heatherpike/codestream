var express = require('express');
var router = express.Router();
var GitHubApi = require('github');

var github = new GitHubApi({
	version: "3.0.0"
});

router.post("/login", function (req, res, next) {
	github.authenticate({
		type: 'basic',
		username: req.body.username,
		password: req.body.password
	});
	github.user.getFromUser({}, function (err, data) {
		console.log(data);
		res.end();
	});
});


module.exports = router;