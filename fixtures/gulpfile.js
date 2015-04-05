"use strict";

var elixir = require('laravel-elixir'),
    argv   = require('yargs').argv;

// Require this plugin
require('..');

elixir(function (mix) {
  mix.webpack(argv.sourcefile, argv.destination, {
    base: __dirname,
    srcDir: './'
  });
})
