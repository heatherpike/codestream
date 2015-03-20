'use strict';
app.controller('JuniorChatCtrl', function($scope){

var io = require('socket.io')(server);
io.on('connection', function(socket) {
	var socketRoom;
	socket.on('join', function(room) {
		socketRoom = room;
		console.log('joining room:', room);
		socket.join(room);
	})
	
	socket.on('send message', function(message) {
		console.log('hit it :', message)
		io.to(socketRoom).emit('new message', message.message)
	})
})


});


