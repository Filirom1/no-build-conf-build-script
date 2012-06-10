var which = require('which'),
  fs = require('fs'),
  Path = require('path'),
  async = require('async'),
  exec = require('child_process').exec,
  log = require('npmlog');

module.exports = {
  glob: '**/*.jpg',

  process: function(files, next){
    if(!files || !files.length) return next();
    /* copied from <https://github.com/h5bp/node-build-script/blob/master/tasks/img.js> */
    which('jpegtran', function(err, bin){
      if(err || !bin) {
        log.warn('jpegtran not found');
        return next();
      }
      async.forEachSeries(files, optimize, next);

      function optimize(file, cb){
        var cmd = bin + ' -copy none -optimize -outfile jpg-tmp.jpg ' + file;
        log.info('jpegtran', cmd);
        var jpegtran = exec(cmd, function(err){
          if(err) cb(err);
          fs.rename('jpg-tmp.jpg', file, cb);
        });
        jpegtran.stdout.pipe(process.stdout);
        jpegtran.stderr.pipe(process.stderr);
      }
    });
  }
};

