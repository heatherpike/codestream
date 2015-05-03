'use strict';
app.config(function($stateProvider) {

  // Register our *about* state.
  $stateProvider.state('about', {
    url: '/about',
    controller: 'AboutController',
    templateUrl: 'js/about/about.html'
  });

});

app.controller('AboutController', function($scope) {
  $scope.members = [{
    name: "Colin Meret",
    img: "https://media.licdn.com/mpr/mpr/shrink_200_200/p/3/005/048/23d/16906d1.jpg",
    github: "https://github.com/colin92"
  }, {
    name: "Richard Moore",
    img: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAIoAAAAJGRhMjRjN2M5LTgwNzAtNDJmOS1hODU3LTQxODQ3MThkMTNmOA.jpg",
    github: "https://github.com/Rmoore424"
  }, {
    name: "Noelle Wandel",
    img: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/7/005/043/0e3/1f90422.jpg",
    github: "https://github.com/noelleantoinette"
  }, {
    name: "Heather Pike",
    img: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAANaAAAAJDM0OWZjYTExLTNhZmItNDU3Yy04OTQ0LWM3YTY0ZDEwNzNiMg.jpg",
    github: "https://github.com/heatherpike"
  }, {
    name: "Chris Gullian",
    img: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAIVAAAAJDEzYTA0NjQzLTM0ZGItNGRjNC1hZWFjLWRhMzU1ZjAwZWM2Zg.jpg",
    github: "https://github.com/crullian"
  }];
});