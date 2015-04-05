'use strict';

var router = require('express').Router();
var fs = require('fs');

router.post('/', function(req, res) {
  var io = require('../../../io')();
  var file = req.body;
  var codestream = req.body.folder + '/codestream.txt';
  if (fs.existsSync(codestream)) {
  	var contents = fs.readFileSync(codestream).toString();
  	var repoId = contents.split(" ")[1];
  	io.to(repoId).emit('file updated', file);
  	res.sendStatus(200);
  }
  else {
  	res.sendStatus(200);
  }
  // console.log("File changed at line number", file.line[0]);
  //will need to emit to the room similar to the chat messages (see io/index.js)
  //can get the room from req.body once we add room to the model
  // io.emit('file updated', file);
  // res.sendStatus(200);
});

module.exports = router;
