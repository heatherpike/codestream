'use strict';
var router = require('express').Router();
var timeline = require('./timeline');
module.exports = router;

router.get('/timeline', function(req, res) {
  timeline(function(commits) {
    res.send(commits);
  });
});
