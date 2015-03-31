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
  $scope.aceLoaded = function(editor) {
    $scope.editor = editor;
    editor.setShowPrintMargin(false);
    console.log(editor);
  } 

  TimelineFactory.getTimeline(function(commits) {
    $scope.commits = TimelineFactory.sortByDate(commits);
  });
 
  FileTreeFactory.fileDirectory().then(function(files) {
    var arr = [];
    arr.push(files);
    $scope.files = arr;
  });

  socket.on('file updated', function(data) {
    
      console.log("file updated!", data)
      $scope.editor.setValue(data.page);
      $scope.liveFileName = data.file;
      $scope.lineNum = data.line[0];
      $scope.editor.scrollToRow($scope.lineNum-1);
      
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