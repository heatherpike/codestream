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
  userId: mongoose.Schema.Types.ObjectId
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
		deferred.resolve(repoInfo);
	})
	return deferred.promise;
});

schema.method('addHook', function (repoInfo, username, password) {
	var deferred = Q.defer();

	github.authenticate({
		type: 'basic',
		username: username,
		password: password
	});
	github.repos.createHook({
		user: username,
		repo: repoInfo.name,
		name: 'web',
		config: {
			url: 'http://codestream.co/api/cli/repos/' + this._id + '/push',
			content_type: 'application/json',
			secret: 'codestream is awesome'
		}
	}, function (err, hookInfo) {
		if (err) deferred.reject(err);
		deferred.resolve(repoInfo);
	})
	return deferred.promise;
});

schema.method('initialCommit', function (file, repo) {
	var deferred = Q.defer();
	var gitRepo = git(repo);
	gitRepo.add(file, function (err) {
		if (err) deferred.reject(err);
		gitRepo.commit("auto committed by Codestream", function (err) {
			if (err) deferred.reject(err);
			gitRepo.remote_push('origin', 'master', function (err) {
				if (err) deferred.reject(err);
				deferred.resolve();
			});
		});
	});
	return deferred.promise;
})

schema.method('clone', function (repoInfo, repoId, username) {
	var deferred = Q.defer();

	git.clone('git@github.com:'+username+'/'+repoInfo.name+'.git', 
  './repos/'+repoId, function(err, _repo) {
	    if(err) deferred.reject(err);
	    deferred.resolve(repoInfo);  
	});
	return deferred.promise;
});

mongoose.model('Repo', schema);
