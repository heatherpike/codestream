var express = require('express');
var router = express.Router();
var models = require('../models/');


// GET home page. 
router.get('/', function(req, res, next) {
  models.Page.find({}, function(err, pages) {
  	res.render('index', { title: 'WikiStack', pages: pages });
  });
});

router.get('/:full_route', function(req, res, next) {
  //look at page name
  //find the page in the database
  //render a view with that object
  models.Page.findOne({ url_name: req.params.url_name }, function(err, page) {
    if(err) return next(err)
    if(!page) return res.status(404).send()
    res.render('show', { 
      title: page.title,
      body: page.body
    })
  })
})


module.exports = router;
