app.controller('MainCtrl', function ($scope, LoginFactory) {
  $scope.title = 'ourapp';

  $scope.submitGithubLogin = function (username, password, repository) {
  	LoginFactory.githubLogin(username, password, repository);
  }
});

app.factory('LoginFactory', function ($http) {
	return {
		githubLogin: function (username, password, repository) {
			console.log(repository);
			return $http.post("/login", {username: username, password: password, repository: repository}).then(function (response) {
				return response.data;
			})
		}
	}
});