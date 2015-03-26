'use strict';
var fileTree = require('./filetree');

var router = require('express').Router();
module.exports = router;

router.get('/filetree', function (req, res) {
    res.send(fileTree(process.cwd()));
});