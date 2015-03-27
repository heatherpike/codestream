var mongoose = require('mongoose');
var config = require('../config');
var crypto = require('crypto');

mongoose.connect('mongodb://localhost/'+config.dbName);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  salt: String
});

var generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

userSchema.pre('save', function(next) {

  var user = this;

  if (user.isModified('password')) {
    user.salt = generateSalt();
    user.password = encryptPassword(user.password, user.salt);
  }

  next();

});

userSchema.method('correctPassword', function(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
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
