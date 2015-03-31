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
  
  // Scope variable init
  $scope.displayLive = true;
  $scope.aceLoaded = function(_editor) {
    $scope.editor = _editor;
  };

  // Display mode function determines which file to display in editor
  $scope.displayMode = function() {
    if($scope.displayLive) {
      $scope.file = $scope.liveFile;
    }
    else {
      $scope.file = $scope.fsFile;
    }
  };

  // ng-click function to set live mode on
  $scope.liveOn = function liveOn() {
    $scope.displayLive = true;
  };

  // $scope.aceChanged = LiveUpdateFactory.updateFile(_editor);
  $scope.aceLoaded = function(editor) {
    editor.setShowPrintMargin(false);
  }
  $scope.aceChanged = function(editor) {
    // editor.focus(); 
    var n = editor.getSession().getValue().split("\n").length; // To count total no. of lines
    editor.gotoLine(n); //Go to end of document
  }

  // Get the timeline, assign to scope
  TimelineFactory.getTimeline(function(commits) {
    $scope.commits = TimelineFactory.sortByDate(commits);
    console.log($scope.commits)
  });

  // Get the filetree to display in sidenav
  FileTreeFactory.fileDirectory().then(function(files) {
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
      FileTreeFactory.getFile(node.path, function(response) {
        $scope.fsFile = response.data.file;
        $scope.displayMode();
        // attempt to reset editor to go to line X (users current line prior
        // to update)
        // $scope.editor.resize(true);
        // $scope.editor.scrollToLine(20, false, true, function () {});
      });
    }
  };

  // On file update, set new filedata equal ot livefile to display in editor
  socket.on('file updated', function(data) {
    $scope.$apply(function() {
      $scope.liveFile = data.page;
      $scope.liveFileName = data.file;
      $scope.displayMode();
    });
  });


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
