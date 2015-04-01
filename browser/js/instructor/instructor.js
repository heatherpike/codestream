'use strict'

app.config(function($stateProvider){

	$stateProvider.state('/instructor', {

		url: '/instructor', 
		templateUrl: 'js/instructor/instructor.html', 
		controller: 'InstructorCtrl'
		
	});
});

app.controller('InstructorCtrl', function($scope, $state, socket, Chat, Timeline, FileTree){

	$scope.displayLive = true;

	$scope.title = '<codestream/>';

	$scope.enter = function(){
		var repo = {
			room: 'chat room', 
			messages: []
		}; 
		$scope.room = repo.room; 
		$scope.messages = repo.messages; 
		
		socket.emit('join', $scope.room);
	}

	$scope.enter();

	$scope.chatInput = '';

	socket.on('new message', function(data){
		$scope.messages.push(data);
		console.log('this is scope messages', $scope.messages);
	})

	// Get the timeline, assign to scope
  Timeline.get(function(commits) {
    $scope.commits = Timeline.sortByDate(commits);
  });

  // Get the filetree to display in sidenav
  FileTree.directory().then(function(files) {
    var arr = [];
    arr.push(files);
    $scope.showSelected = function(sel) {
         $scope.selectedNode = sel;
     };
    $scope.files = files;
  });


})

