var less = require('less'),
  fs = require('fs'),
  Path = require('path'),
  async = require('async'),
  log = require('npmlog');

module.exports = {
  glob: '**/*.less',

  process: function(files, next){
    if(!files || !files.length) return next();
    async.forEach(files, compile, next);
  }
};

function compile(file, cb){
  log.info('less', 'parse', file);
  fs.readFile(file, 'utf-8', function(err, data){
    if(err) return cb(err);
    new less.Parser({
      optimization: 1,
      paths: [Path.dirname(file)],
      filename: file
    }).parse(data, function(err, tree){
      if(err) return cb(err);
      var css = tree.toCSS({
        compress: false,
        yuicompress: false
      });
      var outFile = file.replace(/\.less$/, '.css');
      log.info('less', 'write', outFile);
      fs.writeFile(outFile, css, function(err){
        if(err) return cb(err);
        cb();
      });
    });
  });
}
