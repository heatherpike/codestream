var Promise = require('bluebird');
var path = require('path');

//Using this path for example
// /home/williamhuey/Desktop/CodeStuff/
var cwd = process.cwd();
// [ '', 'home', 'williamhuey', 'Desktop', 'CodeStuff']
var pathSep = cwd.split(path.sep);

// [ '', 'home', 'williamhuey', 'Desktop']
var slicedPath = pathSep.slice(0, pathSep.length - 1);

// /home/williamhuey/Desktop/
var oneUpDirectory = slicedPath.join(path.sep);

module.exports = (function(cb) {
  var open = require('nodegit').Repository.open;
  //Open the repository directory.
  open(oneUpDirectory + '/')
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

        // Create a counter to only show up to 9 entries.


        history.on('end', function(commits) {

          // [1,2,3].map(function(n) { return n * 2}) => [2,4,6]
          var commitsArr = commits.map(function(commit) {
            var count = 1;
            var commitObject = {
              number: '', //"commit: " + count++,
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