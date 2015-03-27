'use strict';

var router = require('express').Router();

router.post('/file_update', function(req, res) {
	console.log("GOT", req.body.page);
	res.send(req.body.page);
})

module.exports = router;




