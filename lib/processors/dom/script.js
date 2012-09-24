var path = require('path'),
      fs = require('fs'),
  mkdirp = require('mkdirp'),
  concat = require('../../utils/concat'),
     md5 = require('../../utils/md5'),
  minify = require('../../utils/minifyJs'),
  log = require('npmlog');

var separator = path.join('/');

module.exports = {
  el: 'script[data-build] src',

  process: function($, dir, scripts, next){
    if(!scripts) return next();
    var keys = Object.keys(scripts);
    if(!keys.length) return next();
    keys.forEach(function(key){
      var srcs = scripts[key];


      // merge
      var result = concat(dir, srcs);

      //minify
      var minified = minify(result);

      // md5
      var hash = md5(minified);
      var newFileName = key.replace('.js', '') + '-' + hash + '.js';
      var newFile = path.join(dir, newFileName);

      var $dataBuild = $('script[data-build="' + key + '"]');

      // keep a reference no the last tag with this data-build attribute.
      var size = $dataBuild.length;

      // only keep the last dataBuild tag
      var $last = null;
      $dataBuild.each(function(i){
        if(i === (size -1) ) { $last = $(this); return; }
        $(this).remove();
      });

      // Update the src of the last dataBuild
      $last.attr('src', newFileName);

      // Write the file and folders in the background.
      mkdirp(path.dirname(newFile), function(err){
        if(err) return next(err);

        log.info('link', 'write', newFile);
        fs.writeFile(newFile, minified, function(err){
          if(err) return next(err);
          next();
        });
      });
    });
  }
};
