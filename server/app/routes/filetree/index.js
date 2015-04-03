'use strict';
var fileTree = require('./filetree');
var getFile = require('./getfile');
var fs = require('fs');

var router = require('express').Router();

router.get('/file', function(req, res) {
  var path = req.query.path;
  getFile.getfile(path, function(err, file) {
    if (err) res.status(500).send(err);
    else {
      res.status(200).json({
        file: file
      });
    }
  });
});

router.get('/:dirname', function(req, res) {
  var path = process.cwd() + '/repos/' + req.params.dirname;
  console.log('path is', path);
  ///fs.open(path, 'r', function (err, fd) {
  //if (err) res.status(500).send(err);
  //else {
  res.send(fileTree(path));
  //}
  //})
});


module.exports = router;