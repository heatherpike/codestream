app.controller('MainCtrl', function ($scope, LoginFactory) {
  $scope.title = 'ourapp';

  $scope.submitGithubLogin = function (username, password) {
  	LoginFactory.githubLogin(username, password);
  }
});

app.factory('LoginFactory', function ($http) {
	return {
		githubLogin: function (username, password) {
			console.log("username", username);
			console.log("password", password);
			return $http.post("/login", {username: username, password: password}).then(function (response) {
				return response.data;
			})
		}
	}
});