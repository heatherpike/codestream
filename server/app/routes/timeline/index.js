'use strict';
var router = require('express').Router();
var timeline = require('./timeline');

router.get('/', function(req, res) { 
  	timeline(function(commits) {
    	res.status(200).send(commits);
  });
});

module.exports = router;
