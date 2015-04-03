'use strict';
var mongoose = require('mongoose');

var router = require('express').Router();

router.post('/', function(req, res) {
  //need to add message to messages array in db
  mongoose.model('Repo').findOneAndUpdate({
    _id: req.body.id
  }, {
    $push: {
      chatComments: req.body.message
    }
  }, function(err, repo) {
    if (err) next(err);
    res.send(repo.chatComments);
  });

});

router.get('/:id', function(req, res) {
  mongoose.model('Repo').findOne({
    _id: req.params.id
  }, function(err, repo) {
    if (err) next(err);
    res.send(repo.chatComments);
  });
});


module.exports = router;