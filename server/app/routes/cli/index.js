var router = require('express').Router();
var GitHubApi = require('github');
var git = require('gift');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Repo = mongoose.model('Repo');
var nodeGit = require('nodegit');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var rootPath = path.resolve(__dirname + "/../../../../");
var github = new GitHubApi({
  version: '3.0.0'
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    mongoose.model('User').findOne({ username: username }, function (err, user) {
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
router.post('/repos/:repoId/push', function (req, res, next) {
  var io = require('../../../io')();
  var repoId = req.params.repoId;
  var repoPath = rootPath + '/repos/' + repoId;
  var repo = git(repoPath);
  repo.sync('origin', 'master', function (err) {
    if (err) next(err);
    io.to(repoId).emit('repo updated', repoId);
    res.status(200).send();
  });
})

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
          res.status(200).send({user: user});
        }
      });
    }
  })(req, res);
});

router.get("/repos/user/:userId", function (req, res, next) {
  Repo.find({userId: req.params.userId}, function (err, repos) {
    if (err) next(err);
    var repoArray = [];
    repos.forEach(function (repo) {
      repoArray.push(repo.name);
    });
    res.status(200).send(repoArray);
  });
});


router.get("/repos/:repoName", function (req, res, next) {
  Repo.findOne({name: req.params.repoName}, function (err, repo) {
    if (err) next(err);
    res.status(200).send(repo._id);
  });
});

router.post('/repos/clone', function (req, res, next) {
  Repo.findOne({_id: req.body.id}, function (err, repo) {
    repo.clone(repo.name, repo._id, req.body.username)
      .then(function (name) {
        return repo.addHook(name, req.body.username, req.body.password)
      })
      .then(function () {
        res.status(200).send(repo._id)
      })
      .catch(function (err) {
        res.status(500).send('Server Error', err)
      })
      .done();
  })
})
// POST /repos/create Creates a new repo in database, uses POST request data to
//      clone the repo locally and set the app to create a classroom session
//      for it, etc.
router.post('/repos/create', function (req, res, next) {
  var newRepo = new Repo({name: req.body.repository,
                          githubUrl: 'git@github.com:' + req.body.username + "/" + req.body.repository + '.git',
                          userId: req.user._id

  });
  newRepo.createRemote(req.body.repository, req.body.username, req.body.password)
    .then(function (repoInfo) {
      newRepo.save(function (err) {
        if (err) next('Save Error', err);
        res.status(200).send({repoId: newRepo._id});  
      })
    })
    .catch(function (err) {
      res.status(500).send("Server Error", err);
    })
    .done();
});

  

module.exports = router;
