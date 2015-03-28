app.factory('TimelineFactory', function($http) {
  return {
    getTimeline: function(cb) {
      return $http.get('/api/timeline').then(function(res) {
        cb(res.data);
      });
    },
    sortByDate: function(commits) {
      function compare(a, b) {
        if (a.date < b.date)
          return -1;
        if (a.date > b.date)
          return 1;
        return 0;
      }

      return commits.sort(compare);
    }
  };
})