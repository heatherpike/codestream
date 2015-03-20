#! /usr/bin/env node

var fs = require("fs");
var path = require("path");
var git = require('gift');
var dir = require("node-dir");

var currentDir = process.cwd();
var repo = git(currentDir);

module.exports = {
	filewatcher: function () {
		if (repo == "undefined") {
			throw new Error("No Git repository initialized");
			return;
		}
		dir.files(currentDir, function (err, files) {
			if (err) throw err;
			files.forEach(function (file) {
				if (!file.match(/node_modules/) && !file.match(/.git/)) {
					fs.watchFile(file, function (curr, prev) {
						 repo.add(file, function (err) {
						 	 repo.commit("auto commited by filewatcher", function (err) {
						 	 	repo.commits(function (err, commits) {})
								repo.remote_push("origin", "master", function (err) {
									if (err) console.log(err);
								});
						 	 });
						 });
					});
				}
			});
		});
	}
}