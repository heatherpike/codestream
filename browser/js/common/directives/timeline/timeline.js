'use strict';
app.directive('timeline', function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/common/directives/timeline/timeline.html',
    controller: 'TimelineCtrl'
  };
});

app.controller('TimelineCtrl', function($scope, Timeline) {
  Timeline.get(function(commits) {
    $scope.commits = Timeline.sortByDate(commits);
  });
})