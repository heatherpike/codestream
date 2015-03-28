'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  githubUrl: {type: String, unique: true},
  userId: mongoose.Schema.Types.ObjectId
});

mongoose.model('Repo', schema);
