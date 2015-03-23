app.factory('LoginFactory', function ($http) {
	return {
		githubLogin: function (username, password, repository) {
			return $http.post("/login", {username: username, password: password, repository: repository}).then(function (response) {
				return response.data;
			})
		}
	}
});