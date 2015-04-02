'use strict';

var router = require('express').Router();


router.get('/', function(req, res){

res.render('landingpage.html');

});

module.exports = router;