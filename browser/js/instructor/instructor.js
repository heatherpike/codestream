'use strict'


var socket = io.connect();
app.config(function($stateProvider) {
  $stateProvider.state('instructor', {
    url: '/instructor/:lectureId',
    templateUrl: 'js/instructor/instructor.html'
  });
});

app.config(function($stateProvider){

	$stateProvider.state('/instructor', {

		url: '/instructor', 
		templateUrl: 'js/instructor/instructor.html', 
		controller: 'InstructorCtrl'
		
	});
});

app.controller('InstructorCtrl', function($scope, $state, $stateParams, socket, Chat, Timeline, FileTree){

	$scope.displayLive = true;

	
	$scope.enter = function () {
    $scope.room = $stateParams.lectureId;
    socket.emit('join', $scope.room);
  }

  socket.on('repo updated', function (repoId) {
    FileTree.directory(repoId)
    .then(function(files) {
      var arr = [];
      arr.push(files);
      $scope.showSelected = function(sel) {
        $scope.selectedNode = sel;
      };
      $scope.files = files;
    });

  });

  $scope.enter();
	// Get the timeline, assign to scope
  // Timeline.get(function(commits) {
  //   $scope.commits = Timeline.sortByDate(commits);
  // });

  // // Get the filetree to display in sidenav
  // FileTree.directory().then(function(files) {
  //   var arr = [];
  //   arr.push(files);
  //   $scope.showSelected = function(sel) {
  //        $scope.selectedNode = sel;
  //    };
  //   $scope.files = files;
  // });


})

