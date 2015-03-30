'use strict';
app.directive('chat', function () {
  return {
      restrict: 'E',
      templateUrl: 'js/common/directives/chat/chat.html',
      controller: 'ChatCtrl'
  };
});

app.controller('ChatCtrl', function($scope, socket, Chat) {
  $scope.enter = function() {
    console.log("chat get", Chat.get);
    Chat.get().then(function (repo) {
      $scope.room = repo.room; 
      $scope.messages = repo.messages;
      console.log($scope.messages);
      socket.emit('join', $scope.room); 
    });
  };

  console.log(Chat.get());

  $scope.enter();

  $scope.chatInput = 'type here';

  $scope.submitChat = function(message) {
    console.log("submit called", message);
    Chat.add(message).then(function(message) {
      socket.emit('send message', message, function() {
        $scope.chatInput = '';
        console.log("message", message);
      });
    });  
  };    

  socket.on('new message', function(data) {
      console.log("data", data);
      $scope.messages.push(data);
    
  });

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