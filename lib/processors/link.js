var path = require('path'),
      fs = require('fs'),
  mkdirp = require('mkdirp'),
  concat = require('../utils/concat'),
     md5 = require('../utils/md5'),
  minify = require('../utils/minifyCss');

var separator = path.join('/');

module.exports = {
  el: 'link[data-build] href',

  process: function($, fromDir, toDir, links, cb){
    if(!links) return cb();
    var keys = Object.keys(links);
    if(!keys.length) return cb();
    keys.forEach(function(key){
      var hrefs = links[key];

      //minify and concat
      var minified = hrefs.map(function(src){
        var file = path.join(fromDir, src);
        return minify(file);
      }).join('\n');

      // md5
      var hash = md5(minified);
      var newFileName = key.replace('.css', '') + '-' + hash + '.css';
      var newFile = path.join(toDir, newFileName);

      var $dataBuild = $('link[data-build="' + key + '"]');

      // keep a reference no the last tag with this data-build attribute.
      var size = $dataBuild.size();

      // only keep the last dataBuild tag
      var $last = null;
      $dataBuild.each(function(i){
        if(i === (size -1) ) { $last = $(this); return; }
        $(this).remove();
      });

      // Update the src of the last dataBuild
      $last.attr('href', newFileName);

      // Write the file and folders in the background.
      mkdirp(path.dirname(newFile), function(err){
        if(err) return cb(err);
        fs.writeFile(newFile, minified, function(err){
          if(err) return cb(err);
          cb();
        });
      });
    });
  }
};

