app.factory('Chat', function() {
	return {
		//add a new message to the array of chats
		//need to set up route and add chat messages to model
		add: function(room, message) {
			return $http.post('/api/chat/', {id: room, message: message}).then(function(res) {
		       return (res.data);
		    });
		},

		//get the chat room and array of existing messages from db
		//could add to repo model
		//need to set up route and generate a room name in model
		get: function(room) {
			return $http.get('/api/chat/'+room).then(function(res) {
				return (res.data);
			});
		}
	};
});