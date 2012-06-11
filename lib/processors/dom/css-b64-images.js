var path = require('path'),
      fs = require('fs'),
  mkdirp = require('mkdirp'),
     md5 = require('../../utils/md5'),
  b64Img = require('css-b64-images'),
     log = require('npmlog');

var separator = path.join('/');

module.exports = {
  el: 'link[data-build] href',

  process: function($, dir, links, next){
    if(!links) return next();
    var keys = Object.keys(links);
    if(!keys.length) return next();
    keys.forEach(function(key){
      var hrefs = links[key];

      var $dataBuild = $('link[data-build="' + key + '"]');
      var href = $dataBuild.attr('href');

      $dataBuild.after('<!--[if lt IE 9]><link rel="stylesheet" href="' + href + '" /><![endif]-->');

      b64Img(path.join(dir, href), dir, function(errs, data){
        if(errs) log.warn('css-b64-images', errs);

        // next5
        var hash = md5(data);
        var newFileName = key.replace('.css', '') + '-' + hash + '.css';
        var newFile = path.join(dir, newFileName);

        $dataBuild.attr('href', newFileName);
        fs.writeFile(newFile, data, function(err){
          if(err) return next(err);
          next();
        });
      });

    });
  }
};

