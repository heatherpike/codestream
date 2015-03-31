app.factory('FileTreeFactory', function($http) {
  return {
    fileDirectory: function() {
      return $http.get('/api/filetree').then(function(res) {
        return (res.data);
      });
    },
    getFile: function getFile(path, cb) {
      return $http.get('/api/filetree/file?path='+path).then(cb);
    }
  }
});
