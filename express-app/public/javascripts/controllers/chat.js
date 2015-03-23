
app.controller('ChatCtrl', function($scope){

$scope.juniors = io.connect('/juniors');

juniors.on('message', function(){


});

juniors.on('disconnect', function(){

})

$scope.seniors = io.connect('/seniors');

seniors.on('message', function(){


})

seniors.on('disconnect', function(){

})


})


