var Promise = require('bluebird');

module.exports = (function(cb) {
  var open = require('nodegit').Repository.open;
  var commits = [];
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
        var count = 0;

        // Listen for commit events from the history.
        // history.on("commit", function(commit) {
        //   // Disregard commits past 9.
        //   // if (++count >= 3) {
        //   //   // console.log("commits", commits);
        //   //   resolve(commits);
        //   // }
        // var commitObject = {
        //   id: commit.sha(),
        //   author: commit.author().name(),
        //   date: commit.date(),
        //   message: commit.message()
        // };

        //   commits.push(commitObject);

        //   // console.log("Commit object array is: ", commits);
        //   // Show the commit sha.
        //   //console.log("commit " + commit.sha());

        //   // Store the author object.
        //   //var author = commit.author();

        //   // Display author information.
        //   //console.log("Author:\t" + author.name() + " <", author.email() + ">");

        //   // Show the commit date.
        //   //console.log("Date:\t" + commit.date());

        //   // Give some space and show the message.
        //   //console.log("\n    " + commit.message());
        // });

        history.on('end', function(commits) {
          // [1,2,3].map(function(n) { return n * 2}) => [2,4,6]
          var commitsArr = commits.map(function(commit) {
            var commitObject = {
              id: commit.sha(),
              author: commit.author().name(),
              date: commit.date(),
              message: commit.message()
            };
            return commitObject;
          })
          resolve(commitsArr);
        })

        // Start emitting events.
        history.start();
      });

    }).then(cb);

});