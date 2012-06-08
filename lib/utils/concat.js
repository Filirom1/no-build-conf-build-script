var fs = require('fs'),
  path = require('path'),
  log = require('npmlog');

module.exports = function(fromDir, srcs){
  log.info('concat', 'Concat files in', fromDir, srcs);
  return srcs.map(function(src){
    var file = path.join(fromDir, src);
    return fs.readFileSync(file);
  }).join(';\n');
};
