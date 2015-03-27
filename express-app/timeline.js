var Promise = require('bluebird');

module.exports = (function(cb) {
  var open = require('nodegit').Repository.open;
  // var commits = [];
  // console.log("it ran");
  // Open the repository directory.
  open(__dirname + '/../')
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
              number: "", //"commit: " + count++,
              id: commit.sha(),
              author: commit.author().name(),
              date: commit.date(),
              message: commit.message()
            };
            // console.log(commitObject);
            return commitObject;
          })
          resolve(commitsArr);
        })

        // Start emitting events.
        history.start();
      });

    }).then(cb);

});