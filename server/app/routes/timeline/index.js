'use strict';
var router = require('express').Router();
var timeline = require('./timeline');
var mongoose = require('mongoose');

router.get('/:dirname', function (req, res, next) {
	mongoose.model('Repo').findOne({_id: dirname}, function(err, repo) {
		timeline(req.params.dirname, function(commits) {
    	res.status(200).send({githubUrl: repo.githubUrl, commits: commits});
	})
  });
})

module.exports = router;