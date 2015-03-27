app.factory('TimelineFactory', function($http) {
  return {
    getTimeline: function(cb) {
      return $http.get('/api/timeline').then(function(res) {
        cb(res.data);
      });
    }
  };
})