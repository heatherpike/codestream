var express = require('express');
var router = express.Router();

//inside this module we don't need slash add since we are in the add page module
router.get('/', function(req, res, next) {
  res.render('add_page', { title: 'Add a Page' });
});

//don't really need to do slash submit here since it's a diff type of request (post vs get)
router.post('/submit', function(req, res, next) {
	var models = require('../models/');
	
	
	var url_name_maker = function(title) {
		var url;
		if (typeof title != "undefined" && title !== "") {
			url = title.replace(/[\W\s]/g, '_');
			if (url.charAt(url.length-1) == ('_')) {
		    	url = url.substring(0, url.length-1);
			}
		}
		else {
			url = Math.random().toString(36).substring(2,7);
		}
		return url;
	};

	var url_name = url_name_maker(req.body.pageTitle);
		
	
	
	//instead of the function above to make the URL name,
	//we could do a .pre call in our index.js model, before POST

	var newPage = new models.Page({
	  title: req.body.pageTitle,
	  url_name: url_name,
	  body: req.body.pageContent
	  });
	//could also do this instead of the above,
	//since our client takes in all of the same keys for the page object/hash,
	//but could have security issues since someone
	//could do a post request and set security variables themselves
	//var newPage = new models.Page(req.body);
	newPage.save();
	res.redirect(page.full_route);
});

module.exports = router;
