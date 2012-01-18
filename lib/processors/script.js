var path = require('path'),
      fs = require('fs'),
  mkdirp = require('mkdirp'),
  concat = require('../utils/concat'),
     md5 = require('../utils/md5'),
  minify = require('../utils/minifyJs');

var separator = path.join('/');

module.exports = {
  process: function($, fromDir, toDir, data, cb){
    var scripts = data.script;
    Object.keys(scripts).forEach(function(key){
      var attrs = scripts[key];
      var srcs = attrs.map(function(attr){ return attr.src; });

      // merge
      var result = concat(fromDir, srcs);

      //minify
      var minified = minify(result);

      // md5
      var hash = md5(minified);
      var newFileName = key.replace('.js', '.' + hash + '.js');
      var newFile = path.join(toDir, newFileName);

      var $dataBuild = $('script[data-build="' + key + '"]');

      // keep a reference no the last tag with this data-build attribute.
      var size = $dataBuild.size();

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
        if(err) return cb(err);
        fs.writeFile(newFile, minified, function(err){
          if(err) return cb(err);
        });
      });
    });
  }
};