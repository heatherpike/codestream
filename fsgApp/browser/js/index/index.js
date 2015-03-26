'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'js/index/index.html'
    });
});

app.controller('MainCtrl', function($scope, TimelineFactory, FileTreeFactory, LiveUpdateFactory) {
  $scope.title = '<codestream/>';

  TimelineFactory.getTimeline(function(commits) {
    $scope.commits = commits.reverse();
  });

  FileTreeFactory.fileDirectory().then(function(files) {
    var arr = [];
    arr.push(files);
    $scope.files = arr;

  });

  LiveUpdateFactory.updateFile().then(function(file) {
    $scope.liveFile = file;
  })

});

