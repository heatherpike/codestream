'use strict';
var router = require('express').Router();
var timeline = require('./timeline');

router.get('/:dirname', function (req, res, next) {
	timeline(req.params.dirname, function(commits) {
    res.status(200).send(commits);
  });
})

module.exports = router;