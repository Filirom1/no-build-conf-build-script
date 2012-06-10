var htmlMinifier = require('html-minifier'),
  fs = require('fs'),
  Path = require('path'),
  async = require('async'),
  log = require('npmlog');

var options = {
  removeComments: true,
  removeCommentsFromCDATA: true
};

module.exports = {
  glob: '**/*.html',

  process: function(files, next){
    if(!files || !files.length) return next();
    async.forEach(files, minify, next);
  }
};

function minify(file, cb){
  log.info('html-minifier', 'optimize', file);
  fs.readFile(file, function(err, data){
    if(err) return cb(err);
    var dataMin = htmlMinifier.minify(data.toString(), options);
    fs.writeFile(file, dataMin, cb);
  });
}
