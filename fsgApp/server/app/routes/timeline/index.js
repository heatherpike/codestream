'use strict';
var router = require('express').Router();
var timeline = require('./timeline');


console.log(timeline);

router.get('/', function(req, res) { 
	console.log("hey");
  	timeline(function(commits) {
    	console.log("commits", commits);
    	res.send(commits);
  });
});

module.exports = router;