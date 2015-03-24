var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect('mongodb://localhost/'+config.dbName);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: {type: String, required: true},
  password: String,
  githubId: String
});

var repoSchema = new Schema({
  name: String,
  githubUrl: {type: String, unique: true},
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Repo: mongoose.model('Repo', repoSchema)
};
