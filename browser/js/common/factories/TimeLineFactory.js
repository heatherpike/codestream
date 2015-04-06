app.factory('Timeline', function($http) {
  return {
    get: function(dirname, cb) {
       return $http.get('/api/timeline/' + dirname).then(function(res) {
        console.log("timeline data", res.data);
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