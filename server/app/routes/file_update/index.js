'use strict';

var router = require('express').Router();

router.post('/', function(req, res) {
  var io = require('../../../io')();
  var file = req.body;
  console.log("File changed at line number", file.line[0]);
  io.emit('file updated', file);
  res.sendStatus(200);
});

module.exports = router;
