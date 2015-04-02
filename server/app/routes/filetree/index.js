'use strict';
var fileTree = require('./filetree');
var getFile = require('./getfile');

var router = require('express').Router();

router.get('/file', function(req, res) {
   var path = req.query.path;
   getFile.getfile(path, function(err, file) {
    if(err) res.status(500).send(err);
    else {
      res.status(200).json({file: file }); 
    }
  }); 
});

router.get('/:dirname', function (req, res) {
	var path = process.cwd() + '/repos/' + req.params.dirname;
    res.send(fileTree(path));
});


module.exports = router;
