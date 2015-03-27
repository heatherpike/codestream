'use strict';

var router = require('express').Router();

router.post('/', function(req, res) {
	var io = require('../../../io')();
	console.log("GOT", io);
	var file = req.body.page;
	// io.on('connection', function(file) {
		io.emit('file updated', file);	
	// });
	res.send(200);
});
 
module.exports = router;


