var express = require('express');
var timeline = require('../timeline');
var fileWalker = require('../file-walker');
var router = express.Router();
var GitHubApi = require('github');
var git = require('gift');
var models = require('../models/');
var config = require('../config.js');
//var gith = require('gith').create(9001);

// passport stuff
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var GITHUB_CLIENT_ID = config.github_client_id;
var GITHUB_CLIENT_SECRET = config.github_client_secret;
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    models.User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Web Interface routes
var github = new GitHubApi({
	version: "3.0.0"
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/chat', function (req, res){
	res.render('chat.ejs');
});

//router.post("/login", function (req, res, next) {
//	console.log(req.body);
//	github.authenticate({
//		type: 'basic',
//		username: req.body.username, 
//		password: req.body.password
//	});
//
//	github.repos.createHook({
//		user: req.body.username,
//		repo: req.body.repository,
//		name: "web",
//		config: {
//			url: "http://codestream.co",
//			content_type: "json",
//			secret: "codestream"
//		},
//		events: ['push'],
//		active: true
//	}, function (err, data) {
//		if (err) console.log(err);
//    // chop of /hooks/[hook_id] from url to get repo api url
//    var githubUrl = data.url.split(/\/hooks\/[0-9]+$/)[0];
//    var newRepo = new model.Repo({
//                               name: req.body.repository,
//                               githubUrl: githubUrl,
//                               userId: 'please integrate me with passport!'});
//    git.clone('git@github.com:'+req.body.username+'/'+req.body.repository+'.git', 
//               '../repos/'+repo._id, 
//               function(err, _repo) {
//                 if(err) console.log(err);
//                 else {
//                   newRepo.save(function(err) {
//                     if(err) console.log(err);
//                   });
//                 }
//               });
//		res.end();
//	});
//});

router.get('/commits', function(req, res) {
  timeline(function(commits) {
    res.send(commits);
  });
});

router.get('/filetree', function(req, res) {
  fileWalker(process.cwd())
})

router.get('/chat', function(req, res) {
  res.render('chat.ejs');
})

// Github webhook listener
router.post('/repos/:repoId/push', function(req, res) {

});

// API for CLIve

// POST /login Oauth login to github
router.post('/login', function(req, res) {
  passport.authenticate('github')(req, res);

});

// GET /loginError What do do when Oauth fails
router.get('/loginError', function(req, res) {

});

// POST /auth/github/callback Oauth successful login for instructor
router.post('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/loginError' }), 
  function(req, res) {
    models.Repo.find({userId: req.user._id}, function(err, repos) {
     res.status(200).json({ repos: repos });
    });
});

// POST /repos/create Creates a new repo in database, uses POST request data to
//      clone the repo locally and set the app to create a classroom session
//      for it, etc.
router.post('/repos/create', function(req, res) {

});

// POST /repos/start Takes an existing repo and creates a classroom
//      session for it, etc.
router.post('/repos/start', function(req, res) {

});

module.exports = router;
