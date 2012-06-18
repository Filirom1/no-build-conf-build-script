var path = require('path'),
      fs = require('fs'),
  log = require('npmlog');

var separator = path.join('/');

module.exports = {
  el: '[data-build-exclude]',

  process: function($, dir, elements, next){
    if(!elements) return next();
    var keys = Object.keys(elements);
    if(!keys.length) return next();
    keys.forEach(function(key){
      log.info('exclude', 'remove %d elements', elements[key].length);
      elements[key].forEach(function($el){
        $el.remove();
      });
    });
    next();
  }
};
