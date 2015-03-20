app.controller('MainCtrl', function($scope, TimelineFactory) {
  $scope.title = '<live2code/>';
  TimelineFactory.getTimeline(function(commits) {
    $scope.commits = commits.reverse();
  });
});