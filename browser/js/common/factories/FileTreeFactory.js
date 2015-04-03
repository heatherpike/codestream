app.factory('FileTree', function($http) {
  return {
    directory: function(dirname) {
      return $http.get('/api/filetree/' + dirname).then(function(res) {
        return (res.data);
      });
    },
    getFile: function getFile(path, cb) {
      return $http.get('/api/filetree/file?path=' + path).then(cb);
    }
  }
});