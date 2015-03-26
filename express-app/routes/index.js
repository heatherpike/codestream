var express = require('express');
var timeline = require('../timeline');
var fileWalker = require('../file-walker');
var router = express.Router();
var GitHubApi = require('github');
var git = require('gift');
var models = require('../models/');
var config = require('../config.js');
//var gith = require('gith').create(9001);

// express session
var session = require('express-session');


// passport stuff
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// wrap in function in order to use session middleware

//  app.use(session({
//    secret: 'omg its alive',
//    resave: true,
//    saveUninitialized: false,
//    cookie: { secure: true }
//  }));
router.use(session({secret:'The answer to Life, The Universe and Everything: 42'}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ username: username }, function (err, user) {
      console.log('err', err, 'user', user);
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.correctPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
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

// POST /login login to server, authenticate user 
router.post('/login', function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if(err) res.status(500).end();
    else if (!user) {
      console.log('!user', info);
      res.status(401).end();
    } 
    else {
      req.login(user, function(err) {
        if(err) {
          console.log('this err', err);
          res.status(500).end(); 
        }
        else {
          models.Repo.find({ userid: user._id }, function(err, repos) {
            if(err) res.status(500).end(); 
            else {
              console.log('this user has these repos:', repos);
              res.status(200).json(repos);
            }
          });
        }
      });
    }
  })(req, res);
});

// POST /repos/create Creates a new repo in database, uses POST request data to
//      clone the repo locally and set the app to create a classroom session
//      for it, etc.
router.post('/repos/create', function(req, res) {
  var newRepo = new models.Repo({name: req.body.repository, 
                                 githubUrl: req.body.githubUrl, 
                                 userId: req.user._id});
  git.clone('git@github.com:'+req.body.username+'/'+req.body.repository+'.git', 
  '../repos/'+newRepo._id, function(err, _repo) {
    if(err) {
      console.log(err);
      res.status(500).send('sorry').end();
    }
    else {
      newRepo.save(function(err) {
        if(err) {
          console.log(err);
          res.status(500).send('could not save repo').end();
        }
        else res.status(200).json({repoId: newRepo._id});
      });
    }
  });
  // ...automagicalness - Code to initialize lecture session at a url
  //                      send instructors the url so they can share with class
});


// POST /repos/start Takes an existing repo and creates a classroom
//      session for it, etc.
router.post('/repos/start', function(req, res) {
  // ...automagicalness - Code to initialize lecture session at a url
  //                      send instructors the url so they can share with class
});

module.exports = router;
