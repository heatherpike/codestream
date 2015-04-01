app.factory('Timeline', function($http) {
  return {
    get: function(cb) {
      return $http.get('/api/timeline').then(function(res) {
        cb(res.data);
      });
    },
    sortByDate: function(commits) {
      return _.sortBy(commits, function(commit) {
        return commit.date;
      });
    }
  };
})