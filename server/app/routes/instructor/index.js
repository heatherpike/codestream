'use strict'

//var instructor = require('./instructor');
 var router = require('express').Router();

router.get('/', function(req, res){
	console.log('this is instructor req', req)


});

router.post('/', function (req, res){

});

module.exports = router;