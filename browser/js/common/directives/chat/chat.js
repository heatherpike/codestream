'use strict';
app.directive('chat', function () {
  return {
      restrict: 'E',
      templateUrl: 'js/common/directives/chat/chat.html',
      controller: 'ChatCtrl'
  };
}

app.controller('ChatCtrl', function($scope, socket, chat) {
  $scope.getRoom = function() {
    Chat.findRoom().then(function (repo) {
      $scope.room = repo.room; 
      $scope.messages = repo.messages;
      socket.emit('join', $scope.room) 
    });
  };

  $scope.chatInput = '';

  $scope.submitChat = function(message) {
    socket.emit('message', message,  function() {
      Chat.add.then(function(message) {
        $scope.chatInput = '';
      });
    });
  };

  socket.on('message', function(data) {
    $scope.messages.push(data);
  })

});


// jQuery(function($){
//               var socket = io.connect();
//               var $messageForm = $('#send-message');
//               var $messageBox = $('#message');
//               var $chat = $('#chat');

//               socket.emit('join', 'juniors');
              
//               $messageForm.submit(function(e){
//                 e.preventDefault();
//                 var message = {};
//                 message.room = 'juniors';
//                 message.message = $messageBox.val();
//                 // socket.emit('send message', $messageBox.val());
//                 socket.emit('send message', message);
//                 $messageBox.val('');
//               });
              
//               socket.on('new message', function(data){
//                 $chat.append(data + "<br/>");
//               });
//             });