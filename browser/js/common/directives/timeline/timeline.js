'use strict';
app.directive('timeline', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/timeline/timeline.html',
    controller: 'TimelineCtrl'
  };
});

app.controller('TimelineCtrl', function($scope, socket, Timeline) {
  
	Timeline.get($scope.room, function(repo) {
    	$scope.commits = Timeline.sortByDate(repo.commits);
      $scope.githubWebUrl = "https://github.com/"+repo.user.username+"/"+repo.repoName+"/tree/"
  	});

	socket.on('repo updated', function (repoId) {
		Timeline.get($scope.room, function(commits) {
	      $scope.commits.push(commits[commits.length-1]);
	    });
	});
})