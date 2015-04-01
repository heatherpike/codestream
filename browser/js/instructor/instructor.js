'use strict'

app.config(function($stateProvider){

	$stateProvider.state('/instructor', {

		url: '/instructor', 
		templateUrl: 'js/instructor/instructor.html', 
		controller: 'InstructorCtrl'
		
	});
});

app.controller('InstructorCtrl', function ($scope, $state, socket, Chat){

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


})

