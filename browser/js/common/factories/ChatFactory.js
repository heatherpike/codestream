app.factory('Chat', function() {
	return {
		//add a new message to the array of chats
		//need to set up route
		add: function(message) {
			console.log('message added');
			// return $http.post('/api/chat').then(function(res) {
		 //       return (res.data);
		 //    });
		},

		//get the chat room and array of existing messages
		//could add to repo model
		//need to set up route and generate a room name in model
		get: function() {
			// return $http.get('/api/chat').then(function(res) {
			// 	return (res.data);
			// });
			return {
				room: 'juniors',
				messages: ['hey', 'how are you']
			}
		}
	};
});