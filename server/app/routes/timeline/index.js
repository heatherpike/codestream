'use strict';
var router = require('express').Router();
var timeline = require('./timeline');
var mongoose = require('mongoose');

router.get('/:dirname', function (req, res, next) {
	console.log("timeline req", req.params);
	mongoose.model('Repo').findOne({_id: req.params.dirname}).populate('user').exec(function(err, repo) {
		console.log("repo", repo)
		timeline(req.params.dirname, function(commits) {
		console.log("commits", commits);
		console.log("latest", commits[0].id);
    	res.status(200).send({user: repo.user, repoName: repo.name, commits: commits});
	})
  });
})

module.exports = router;