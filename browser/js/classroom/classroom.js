'use strict';

var socket = io.connect();
app.config(function($stateProvider) {
  $stateProvider.state('classroom', {
    url: '/classroom/:lectureId',
    templateUrl: 'js/classroom/classroom.html'
  });
});

app.controller('ClassroomCtrl', function($scope, socket, FileTree, $stateParams) {
  $scope.enter = function () {
    $scope.room = $stateParams.lectureId;
    socket.emit('join', $scope.room);
  }

  socket.on('repo updated', function (repoId) {
    FileTree.directory(repoId)
    .then(function(files) {
      var arr = [];
      arr.push(files);
      $scope.showSelected = function(sel) {
        $scope.selectedNode = sel;
      };
      $scope.files = files;
    });

  });

  $scope.enter();
  // Scope variable init
  $scope.displayLive = true;
  $scope.aceLoaded = function(_editor) {
    _editor.setShowPrintMargin(false);
    $scope.editor = _editor;
    _editor.setShowPrintMargin(false);
  };

  // Display mode function determines which file to display in editor
  $scope.displayMode = function() {

    if ($scope.displayLive) {
      $scope.editor.setValue($scope.liveFile);
      $scope.editor.scrollToRow($scope.lineNum - 1);
    } else {

      $scope.file = $scope.fsFile;
    }
  };

  // ng-click function to set live mode on
  $scope.liveOn = function liveOn() {
    $scope.displayLive = true;
    $scope.displayMode();
  };


  // Get the filetree to display in sidenav
  FileTree.directory($stateParams.lectureId).then(function(files) {

    var arr = [];
    arr.push(files);
    $scope.showSelected = function(sel) {
      $scope.selectedNode = sel;
    };
    $scope.files = files;
  });

  // ng-click function to get file clicked on in sidenav
  $scope.getFile = function(node) {
    $scope.displayLive = false; // not in liveFile display mode anymore
    if (node.type == 'file') {
      FileTree.getFile(node.path, function(response) {
        $scope.fsFile = response.data.file;
        console.log('file', response);
        $scope.displayMode();
        // attempt to reset editor to go to line X (users current line prior
        // to update)
        // $scope.editor.resize(true);
        // $scope.editor.scrollToLine(20, false, true, function () {});
      });
    }
  };

  // On file update, set new filedata equal to livefile to display in editor

  socket.on('file updated', function(data) {

    console.log("file updated!", data)
    $scope.liveFile = data.page;
    $scope.liveFileName = data.file;
    $scope.lineNum = data.line[0];
    $scope.displayMode();
  });
  // });


  // Fun ascii art, who doesn't love ascii art?
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