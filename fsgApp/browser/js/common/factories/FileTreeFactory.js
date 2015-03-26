app.factory('FileTreeFactory', function($http) {
  return {
    fileDirectory: function() {
      return $http.get('/filetree').then(function(res) {
        return (res.data);
      });
    }
  }
});