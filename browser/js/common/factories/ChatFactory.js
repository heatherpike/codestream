app.factory('Chat', function($q) {
	return {
		//add a new message to the array of chats
		//need to set up route
		add: function(message) {
			return new $q(function (resolve, reject) {
				resolve(message);	
			})
			
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

			return new $q(function (resolve, reject)  {
				resolve({
					room: 'chat room',
					messages: ['hey', 'how are you']
				});
			})
		}
	};
});