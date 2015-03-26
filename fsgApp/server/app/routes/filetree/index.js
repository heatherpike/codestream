'use strict';
var fileTree = require('./filetree');

var router = require('express').Router();


router.get('/', function (req, res) {
	console.log("filetree route?");
    res.send(fileTree(__dirname + "/../"));
});

module.exports = router;