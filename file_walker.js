var fs = require("fs");
// var dir = require("node-dir");
    path = require('path')

function dirTree(filename) {
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
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}

if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    console.log(util.inspect(dirTree(process.cwd()), false, null));
}

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

