app.controller('MainCtrl', function($scope, TimelineFactory, FileSystemFactory) {
  $scope.title = '<codestream/>';

  TimelineFactory.getTimeline(function(commits) {
    $scope.commits = commits; //.reverse();
  });

  FileSystemFactory.fileDirectory().then(function(files) {
    var arr = [];
    arr.push(files);
    $scope.files = arr;

  });

});