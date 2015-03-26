'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'js/index/index.html'
    });
});

app.controller('MainCtrl', function($scope, TimelineFactory, FileTreeFactory) {
  $scope.title = '<codestream/>';

  TimelineFactory.getTimeline(function(commits) {
    console.log("commits", commits);
    $scope.commits = commits.reverse();
  });

  FileTreeFactory.fileDirectory().then(function(files) {
    var arr = [];
    arr.push(files);
    $scope.files = arr;

  });

});

app.controller('ChatCtrl', function($scope) {

  $scope.juniors = io.connect('/juniors');

  juniors.on('message', function() {


  });

  juniors.on('disconnect', function() {

  })

  $scope.seniors = io.connect('/seniors');

  seniors.on('message', function() {

  })
  seniors.on('disconnect', function() {

  })
});

