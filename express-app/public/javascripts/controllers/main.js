app.controller('MainCtrl', function($scope, TimelineFactory, LoginFactory) {
  $scope.title = '<codestream/>';
  
  TimelineFactory.getTimeline(function(commits) {
    $scope.commits = commits.reverse();
  });

  $scope.submitGithubLogin = function (username, password, repository) {
  	LoginFactory.githubLogin(username, password, repository);
  }

});

