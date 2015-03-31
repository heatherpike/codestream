'use strict';
var socket = io.connect();
app.config(function($stateProvider) {
  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'js/index/index.html'
  });
});

app.controller('MainCtrl', function($scope, FileTree) {

  $scope.aceLoaded = function(editor) {
      editor.setShowPrintMargin(false);
    }
  // $scope.aceChanged = function(editor) {
  //   // editor.focus(); 
  //   var n = editor.getSession().getValue().split("\n").length; // To count total no. of lines
  //   editor.gotoLine(n); //Go to end of document
  // }

  FileTree.directory().then(function(files) {
    var arr = [];
    arr.push(files);
    $scope.files = arr;

  });

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