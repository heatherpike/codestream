'use strict';

var socket = io.connect();
app.config(function($stateProvider) {
  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'js/index/index.html'
  });
});

app.controller('MainCtrl', function($scope, FileTree) {



  // // Fun ascii art, who doesn't love ascii art?
  // ['                 .___               __                                 ',
  //   '  ____  ____   __| _/____   _______/  |________   ____ _____    _____  ',
  //   '_/ ___\\/  _ \\ / __ |/ __ \\ /  ___/\\   __\\_  __ \\_/ __ \\__  \\  /     \\ ',
  //   '\\  \\__(  <_> ) /_/ \\  ___/ \\___ \\  |  |  |  | \\/\\  ___/ / __ \\|  Y Y  \\ ',
  //   ' \\___  >____/\\____ |\\___  >____  > |__|  |__|    \\___  >____  /__|_|  /',
  //   '     \\/           \\/    \\/     \\/                    \\/     \\/      \\/ '
  // ].forEach(function(ln) {
  //   console.log(ln)
  // })

});