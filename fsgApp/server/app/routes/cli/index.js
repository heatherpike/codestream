var router = require('express').Router();
var GitHubApi = require('github');
var git = require('gift');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../../../db/');

router.use(session({secret:'The answer to Life, The Universe and Everything: 42'}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    models('User').findOne({ username: username }, function (err, user) {
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
          models('Repo').find({ userid: user._id }, function(err, repos) {
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
  var newRepo = new models('Repo')({name: req.body.repository, 
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
