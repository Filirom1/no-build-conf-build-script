var which = require('which'),
  fs = require('fs'),
  Path = require('path'),
  async = require('async'),
  exec = require('child_process').exec,
  log = require('npmlog');

module.exports = {
  glob: '**/*.png',

  process: function(files, next){
    if(!files || !files.length) return next();
    log.info('optipng', 'optimize', files);
    /* inspired from <https://github.com/h5bp/node-build-script/blob/master/tasks/img.js> */
    which('optipng', function(err, bin){
      if(err || !bin) {
        log.warn('optipng', 'optipng not found. Please install it and add it in your PATH.');
        return next();
      }
      var cmd = bin + ' -quiet ' + files.join(' ');
      log.info('optipng', cmd);
      var optipng = exec(cmd, next);
      optipng.stdout.pipe(process.stdout);
      optipng.stderr.pipe(process.stderr);
    });
  }
};
