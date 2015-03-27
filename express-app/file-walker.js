var fs = require("fs"),
  path = require('path');

module.exports =
  function dirTree(filename) {
    //depending where we ultimately read files from we may need to refactor this to async
    var stats = fs.lstatSync(filename),
      info = {
        path: filename,
        name: path.basename(filename)
      };

    if (stats.isDirectory()) {
      info.type = "folder";
      info.children = fs.readdirSync(filename).map(function(child) {
        return dirTree(filename + '/' + child);
      });
    } else {
      // assuming anything else is a file but what edge cases should we consider?
      info.type = "file";
    }

    return info;
  };

//not sure what module.parent is doing or if we truly need it. let's ask later
// if (module.parent == undefined) {
//     //use util.inspect with options false, null to print out the full nested objects, 
//     //otherwise it limits depth
//     // var util = require('util');
//     //for now calling function on the current working directory, so sync should work fine
//     // var fileTree = dirTree(process.cwd());
//     // var wikiTree = dirTree('./wikistack');
//     return dirTree(process.cwd());
//     // console.log(typeof wikiTree);
//     // console.log(wikiTree);
//     // console.log(util.inspect(wikiTree, false, null));
//     // console.log(util.inspect(wikiTree, false, null));
// }


// var dir = require("node-dir");
// var walk = function(dir, done) {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var i = 0;
//     (function next() {
//       var file = list[i++];
//       if (!file) return done(null, results);
//       file = dir + '/' + file;
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             next();
//           });
//         } else {
//           results.push(file);
//           next();
//         }
//       });
//     })();
//   });
// };

// walk('./wikistack', function(err, results) {
//   if (err) throw err;
//   console.log(results);
// });

// //This sets up the file finder
// var finder = require('findit')("./wikistack");

// //This listens for directories found
// finder.on('directory', function (dir) {
//   console.log('Directory: ' + dir + '/');
// });

// //This listens for files found
// finder.on('file', function (file) {
//   console.log('File: ' + file);
// });

// dir.files('../wikistack', function(err, files) {
//     if (err) throw err;
//     console.log("dir.files", files);
// });

// dir.subdirs('../wikistack', function(err, subdirs) {
//     if (err) throw err;
//     console.log("dir.pubdirs:", subdirs);
// });

// dir.paths('../wikistack', function(err, paths) {
//     if (err) throw err;
//     console.log("dir.paths files and dirs:", 'files:\n',paths.files);
//     console.log('subdirs:\n', paths.dirs);
// });

// dir.paths('../wikistack', true, function(err, paths) {
//     if (err) throw err;
//     console.log("dir.paths consolidated:", 'paths:\n',paths);
// });

// fs.readdir('../wikistack', function (err, paths) {
// 	if (err) throw err;
// 	console.log("fs.readdir", paths);
// })

//to get files from current directory use process.cwd()