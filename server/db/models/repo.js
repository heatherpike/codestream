'use strict';
var mongoose = require('mongoose');
var GitHubApi = require('github');
var git = require('gift');
var Q = require('q');

var github = new GitHubApi({
	version: '3.0.0'
});

var schema = new mongoose.Schema({
  name: String,
  githubUrl: {type: String, unique: true},
  userId: mongoose.Schema.Types.ObjectId,
  chatComments: [String]
});

schema.method('createRemote', function (name, username, password) {
	var deferred = Q.defer();

	github.authenticate({
		type: 'basic',
		username: username,
		password: password
	});

	github.repos.create({
		name: name
	}, function (err, repoInfo) {
		if (err) deferred.reject(err);
		else deferred.resolve(repoInfo);
	})
	return deferred.promise;
});

schema.method('addHook', function (name, username, password) {
	var deferred = Q.defer();

	github.authenticate({
		type: 'basic',
		username: username,
		password: password
	});

	github.repos.createHook({
		user: username,
		repo: name,
		name: 'web',
		config: {
			url: 'http://593d2949.ngrok.com/api/cli/repos/' + this._id + '/push',
			content_type: 'application/json',
			secret: 'codestream is awesome'
		}
	}, function (err, hookInfo) {
		if (err) deferred.reject(err);
		deferred.resolve();
	})
	return deferred.promise;
});

schema.method('clone', function (name, repoId, username) {
	var deferred = Q.defer();

	git.clone('http://github.com/'+username+'/'+name+'.git', 
  './repos/'+repoId, function(err, _repo) {
	    if(err) deferred.reject(err);
	    deferred.resolve(name);  
	});
	return deferred.promise;
});

mongoose.model('Repo', schema);
