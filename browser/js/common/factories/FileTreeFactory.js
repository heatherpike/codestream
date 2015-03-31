app.factory('FileTree', function($http) {
  return {
    directory: function() {
      return $http.get('/api/filetree').then(function(res) {
        return (res.data);
      });
    }
  }
});