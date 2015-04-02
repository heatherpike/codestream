var Promise = require('bluebird');
var path = require('path');

module.exports = (function(dirname, cb) {
  var open = require('nodegit').Repository.open;
  //Open the repository directory.
  var path = process.cwd() + '/repos/' + dirname;
  open(path)
    // Open the master branch.
    .then(function(repo) {
      return repo.getMasterCommit();
    })
    // Display information about commits on master.
    .then(function(firstCommitOnMaster) {
      // console.log("here");
      return new Promise(function(resolve, reject) {
        // Create a new history event emitter.
        var history = firstCommitOnMaster.history();
        history.on('end', function(commits) {
          var commitsArr = commits.map(function(commit) {
            var commitObject = {
              number: '',
              id: commit.sha(),
              author: commit.author().name(),
              date: commit.date(),
              message: commit.message()
            };
            return commitObject;
          });
          resolve(commitsArr);
        });
        // Start emitting events.
        history.start();
      });
    }).then(cb);
});