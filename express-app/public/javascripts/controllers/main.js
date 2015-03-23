app.controller('MainCtrl', function($scope, TimelineFactory) {
  $scope.title = '<codestream/>';
  TimelineFactory.getTimeline(function(commits) {
    $scope.commits = commits.reverse();
  });
});