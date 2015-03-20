app.controller('MainCtrl', function($scope, TimelineFactory) {
  $scope.title = 'Ourapp';
  TimelineFactory.getTimeline(function(commits) {
    $scope.commits = commits.reverse();
  });
});