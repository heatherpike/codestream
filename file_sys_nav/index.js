var fs = require("fs");
var dir = require("node-dir");

// dir.files("../express-app", function(err, files) {
//     if (err) throw err;
//     console.log(files);
// });

// dir.subdirs('../public', function(err, subdirs) {
//     if (err) throw err;
//     console.log(subdirs);
// });

// dir.paths('../express-app/public', function(err, paths) {
//     if (err) throw err;
//     console.log('files:\n',paths.files);
//     console.log('subdirs:\n', paths.dirs);
// });

// dir.paths('../express-app/public', true, function(err, paths) {
//     if (err) throw err;
//     console.log('paths:\n',paths);
// });

fs.readdir('../express-app/public', function (err, paths) {
	if (err) throw err;
	console.log(paths);
})

//to get files from current directory use process.cwd()

