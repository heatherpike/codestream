'use strict';
var socket = io.connect();
app.config(function($stateProvider) {
  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'js/index/index.html'
  });
});

app.controller('MainCtrl', function($scope, TimelineFactory, FileTreeFactory) {
  $scope.title = '<codestream/>';
  // $scope.aceChanged = LiveUpdateFactory.updateFile(_editor);
  $scope.aceLoaded = function() {
    console.log("Ace Loading");
  }
  TimelineFactory.getTimeline(function(commits) {
    $scope.commits = TimelineFactory.sortByDate(commits);
    console.log($scope.commits)
  });

  FileTreeFactory.fileDirectory().then(function(files) {
    var arr = [];
    arr.push(files);
    $scope.files = arr;

  });

  // LiveUpdateFactory.updateFile().then(function(file) {
  //   $scope.liveFile = file;
  // })
  socket.on('file updated', function(data) {
    $scope.$apply(function() {
      $scope.liveFile = data.page;
      $scope.liveFileName = data.file;
    });
  });

  ['                 .___               __                                 ',
    '  ____  ____   __| _/____   _______/  |________   ____ _____    _____  ',
    '_/ ___\\/  _ \\ / __ |/ __ \\ /  ___/\\   __\\_  __ \\_/ __ \\__  \\  /     \\ ',
    '\\  \\__(  <_> ) /_/ \\  ___/ \\___ \\  |  |  |  | \\/\\  ___/ / __ \\|  Y Y  \\ ',
    ' \\___  >____/\\____ |\\___  >____  > |__|  |__|    \\___  >____  /__|_|  /',
    '     \\/           \\/    \\/     \\/                    \\/     \\/      \\/ '
  ].forEach(function(ln) {
    console.log(ln)
  })

});