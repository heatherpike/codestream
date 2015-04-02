'use strict';
app.directive('chat', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/chat/chat.html',
    controller: 'ChatCtrl'
  };
});

app.controller('ChatCtrl', function($scope, socket, Chat, $stateParams) {

  $scope.chatInput = '';

  Chat.get($stateParams.lectureId).then(function (repo) {
      $scope.messages = repo.messages;
  };

  $scope.submitChat = function(message) {
    //will need to call Chat.add from the factory to add this message to the messages array once we set up Chat message array in the model
    Chat.add($scope.room, message).then(function(data) {
      socket.emit('send message', message);
      $scope.chatInput = '';
    });  
  };

  socket.on('new message', function(data) {
      $scope.messages.push(data);
  });

});

