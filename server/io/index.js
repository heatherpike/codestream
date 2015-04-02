'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);
    io.on('connection', function (socket) {
        // Now have access to socket, wowzers!
        var socketRoom;
		socket.on('join', function(room) {
			socketRoom = room;
			console.log('joining room:', room);
			socket.join(room);
		});
	
		socket.on('send message', function(message) {
			console.log('hit it :', message)
			io.to(socketRoom).emit('new message', message)
			//need to add new message into messages array in db
			//how do we access db from here?
		});
    });
}; 



