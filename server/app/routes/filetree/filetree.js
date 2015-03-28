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