'use strict';
var fileTree = require('./filetree');

var router = require('express').Router();


router.get('/', function (req, res) {
    res.send(fileTree(__dirname + "/../"));
});

module.exports = router;