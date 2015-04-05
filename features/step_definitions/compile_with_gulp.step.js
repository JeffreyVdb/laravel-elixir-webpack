"use strict";

var fs    = require('fs'),
    rmdir = require('rimraf'),
    spawn = require('child_process').spawn,
    path  = require('path'),

    sourceFile, destDir;

var buildPath = path.normalize(__dirname + '/../../build'),
    gulpFile  = path.normalize(__dirname + '/../../fixtures/gulpfile.js');

module.exports = function () {
  this.Given(/^I have a clean workspace$/, function (callback) {
    rmdir(buildPath, function (error) {
      if (error) callback.fail(new Error("workspace could not be cleared"));
      else callback();
    });
  });

  this.Given(/^a source file "([^"]*)"$/, function (source, callback) {
    sourceFile = source;
    callback();
  });

  this.Given(/^that the destination directory is "([^"]*)"$/, function (dest, callback) {
    destDir = '../' + dest;
    callback();
  });

  this.When(/^I run this elixir plugin$/, function (callback) {
    var child = spawn('gulp', [
      '--gulpfile', gulpFile,
      '--sourcefile', sourceFile,
      '--destination', destDir
    ]);

    child.on('error', function (err) {
      callback.fail(new Error(err));
      return;
    });

    child.on('exit', function (code) {
      if (code == 0) {
        callback();
        return;
      }

      callback.fail(new Error('exit code should be 0'));
    });
  });

  this.Then(/^there should be a file called "([^"]*)" within the destination directory$/,
    function (outputFile, callback) {
      var outputPath = path.resolve(__dirname, '../../fixtures', destDir, outputFile);
      fs.exists(outputPath, function (exists) {
        if (exists) {
          callback();
        }
        else {
          callback.fail(new Error("output file does not exist"));
        }
      })
    });
};
