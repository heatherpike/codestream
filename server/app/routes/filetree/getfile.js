var fs = require('fs');

module.exports = {

  getfile: function(path, cb) {
  fs.readFile(path, 'utf8', cb); 
  }

};
