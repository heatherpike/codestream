// var directory = [{
//   path: './wikistack',
//   name: 'wikistack',
//   type: 'folder',
//   children: [{
//     path: './wikistack/app.js',
//     name: 'app.js',
//     type: 'file'
//   }, {
//     path: './wikistack/bin',
//     name: 'bin',
//     type: 'folder',
//     children: [{
//       path: './wikistack/bin/www',
//       name: 'www',
//       type: 'file'
//     }]
//   }, {
//     path: './wikistack/filters.js',
//     name: 'filters.js',
//     type: 'file'
//   }, {
//     path: './wikistack/models',
//     name: 'models',
//     type: 'folder',
//     children: [{
//       path: './wikistack/models/index.js',
//       name: 'index.js',
//       type: 'file'
//     }]
//   }, {
//     path: './wikistack/package.json',
//     name: 'package.json',
//     type: 'file'
//   }, {
//     path: './wikistack/public',
//     name: 'public',
//     type: 'folder',
//     children: [{
//       path: './wikistack/public/images',
//       name: 'images',
//       type: 'folder',
//       children: []
//     }, {
//       path: './wikistack/public/javascripts',
//       name: 'javascripts',
//       type: 'folder',
//       children: []
//     }, {
//       path: './wikistack/public/stylesheets',
//       name: 'stylesheets',
//       type: 'folder',
//       children: [{
//         path: './wikistack/public/stylesheets/style.css',
//         name: 'style.css',
//         type: 'file'
//       }]
//     }]
//   }, {
//     path: './wikistack/routes',
//     name: 'routes',
//     type: 'folder',
//     children: [{
//       path: './wikistack/routes/add.js',
//       name: 'add.js',
//       type: 'file'
//     }, {
//       path: './wikistack/routes/index.js',
//       name: 'index.js',
//       type: 'file'
//     }, {
//       path: './wikistack/routes/users.js',
//       name: 'users.js',
//       type: 'file'
//     }]
//   }, {
//     path: './wikistack/views',
//     name: 'views',
//     type: 'folder',
//     children: [{
//       path: './wikistack/views/about_us.html',
//       name: 'about_us.html',
//       type: 'file'
//     }, {
//       path: './wikistack/views/add_page.html',
//       name: 'add_page.html',
//       type: 'file'
//     }, {
//       path: './wikistack/views/error.html',
//       name: 'error.html',
//       type: 'file'
//     }, {
//       path: './wikistack/views/index.html',
//       name: 'index.html',
//       type: 'file'
//     }, {
//       path: './wikistack/views/layout.html',
//       name: 'layout.html',
//       type: 'file'
//     }, {
//       path: './wikistack/views/show.html',
//       name: 'show.html',
//       type: 'file'
//     }]
//   }]
// }];

// app.factory('FileSystemFactory', function($http) {
//   return {
//     fileDirectory: directory
//   };
// })
app.factory('FileSystemFactory', function($http) {
  return {
    fileDirectory: function() {
      return $http.get('/filetree').then(function(res) {
        return (res.data);
      });
    }
  }
});