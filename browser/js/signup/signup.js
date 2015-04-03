app.config(function($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function($scope, AuthService, $state) {

    $scope.signup = {};
    $scope.error = null;


    $scope.sendSignup = function(signupInfo) {
        console.log('sending frontend signup');
        $scope.error = null;
        console.log('heres the signup info', signupInfo);
        AuthService.signup(signupInfo).then(function() {
            console.log('going to auth service');
            $state.go('instructor');
        }).catch(function() {
            $scope.error = 'Error registering user!';
        });

    };

});