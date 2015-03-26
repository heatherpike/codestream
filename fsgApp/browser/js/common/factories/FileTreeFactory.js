app.factory('FileTreeFactory', function($http) {
  return {
    fileDirectory: function() {
      return $http.get('/api/filetree').then(function(res) {
        return (res.data);
      });
    }
  }
});