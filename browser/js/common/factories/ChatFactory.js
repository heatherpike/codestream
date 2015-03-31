app.factory('Chat', function($q) {
	return {
		//add a new message to the array of chats
		//need to set up route and add chat messages to model
		add: function(message) {
			
			// return $http.post('/api/chat').then(function(res) {
		 //       return (res.data);
		 //    });
		},

		//get the chat room and array of existing messages from db
		//could add to repo model
		//need to set up route and generate a room name in model
		get: function() {
			// return $http.get('/api/chat').then(function(res) {
			// 	return (res.data);
			// });
		}
	};
});