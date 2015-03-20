app.factory('TimelineFactory', function($http) {
  return {
    getTimeline: function(cb) {
      return $http.get('/commits').then(function(res) {
        cb(res.data);
      });
    }
  };
})