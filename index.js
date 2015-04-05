var gulp         = require('gulp'),
    webpack      = require('gulp-webpack'),
    uglify       = require('gulp-uglify'),
    vinylNamed   = require('vinyl-named'),
    gulpIf       = require('gulp-if'),
    _            = require('lodash'),
    elixir       = require('laravel-elixir'),
    utilities    = require('laravel-elixir/ingredients/commands/Utilities'),
    notification = require('laravel-elixir/ingredients/commands/Notification');

elixir.extend('webpack', function (src, dest, options) {

  var config = this,
      defaultOptions = {
        debug: !config.production,
        watch: !config.production,
        srcDir: config.assetsDir + 'js',
        base: config.assetsDir + 'js',
        plugin: {}
      };

  options = _.extend(defaultOptions, options);
  src = "./" + utilities.buildGulpSrc(src, options.srcDir);
  dest = dest || config.jsOutput;

  gulp.task('webpack', function () {

    var onError = function (e) {
      new notification().error(e, 'Webpack Compilation Failed!');
      this.emit('end');
    };

    var namedCb = function (file) {
      file.named = file.relative.replace(/\.[^\.]+$/, '');
      this.queue(file);
    };

    return gulp.src(src, { base: options.base })
      .pipe(vinylNamed(namedCb))
      .pipe(webpack(options.plugin)).on('error', onError)
      .pipe(gulpIf(!options.debug, uglify()))
      .pipe(gulp.dest(dest))
      .pipe(new notification().message('Webpack Compiled!'));
  });

  this.registerWatcher('webpack', options.srcDir + '/**/*.js');

  return this.queueTask('webpack');
});
