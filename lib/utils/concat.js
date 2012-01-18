var fs = require('fs'),
  path = require('path');

module.exports = function(fromDir, srcs){
  return srcs.map(function(src){
    var file = path.join(fromDir, src);
    return fs.readFileSync(file);
  }).join('\n');
};
