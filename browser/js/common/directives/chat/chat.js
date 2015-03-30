'use strict';
app.directive('chat', function (socket) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/chat/chat.html',
        link: function (scope) {

        }

    };

jQuery(function($){
              var socket = io.connect();
              var $messageForm = $('#send-message');
              var $messageBox = $('#message');
              var $chat = $('#chat');

              socket.emit('join', 'juniors');
              
              $messageForm.submit(function(e){
                e.preventDefault();
                var message = {};
                message.room = 'juniors';
                message.message = $messageBox.val();
                // socket.emit('send message', $messageBox.val());
                socket.emit('send message', message);
                $messageBox.val('');
              });
              
              socket.on('new message', function(data){
                $chat.append(data + "<br/>");
              });
            });