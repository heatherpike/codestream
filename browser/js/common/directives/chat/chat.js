'use strict';
app.directive('chat', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/chat/chat.html',
    controller: 'ChatCtrl'
  };
});

app.controller('ChatCtrl', function($scope, socket, Chat) {

  // $scope.enter = function() {
  //   //console.log("chat get", Chat.get);
  //   //will need to call Chat.get from the factory once we set up Chat message array in the model
  //   // Chat.get().then(function (repo) {
  //     // var repo = {
  //     //     room: 'chat room',
  //     //     messages: ['hey', 'how are you']
  //     //   };
  //     $scope.room = repo.room; 
  //     $scope.messages = repo.messages;
  //     //console.log($scope.messages);
  //     socket.emit('join', $scope.room); 
  //   // });
  // };
  $scope.messages = [];
  // $scope.enter();

  $scope.chatInput = '';

  $scope.submitChat = function(message) {
    //will need to call Chat.add from the factory to add this message to the messages array once we set up Chat message array in the model
    // Chat.add(message).then(function(data) {
    socket.emit('send message', message);
    $scope.chatInput = '';
    // });  
  };

  socket.on('new message', function(data) {

      $scope.messages.push(data);
  });

});

