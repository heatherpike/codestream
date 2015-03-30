'use strict';
var router = require('express').Router();
var timeline = require('./timeline');

router.get('/', function(req, res) {
  timeline(function(commits) {
    res.send(commits);
  });
});

module.exports = router;