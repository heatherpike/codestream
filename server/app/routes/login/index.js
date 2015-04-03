'use strict';

var router = require('express').Router();
module.exports = router;
var GitHubApi = require('github');
//var gith = require('gith').create(9001);

var github = new GitHubApi({
  version: "3.0.0"
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});