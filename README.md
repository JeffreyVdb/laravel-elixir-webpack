# laravel-elixir-webpack

Simple extension to *laravel elixir* to build javascript bundle with *webpack*.

## Install

```shell
npm install --save-dev jeffreyvdb/laravel-elixir-webpack
```

## Usage

### Example *Gulpfile*:

The following code snippet will compile every file with a `.js` extension using
webpack. calls to `require('jquery')` will require the jquery component installed
through bower.

```javascript
var elixir = require("laravel-elixir"),
    path = require('path');

require("laravel-elixir-webpack");

var paths = {
    'jquery': './bower_components/jquery/'
};

elixir(function(mix) {
  mix.webpack("**/*.js", './public', {
    base: './resources/assets/', // The base argument for gulp.src
    plugin: {
      // Webpack specific configuration goes here.
      resolve: {
        alias: {
          'jquery': path.resolve(__dirname, paths.jquery + 'dist/jquery.js')
        }
      }
    }
  });
});
```

