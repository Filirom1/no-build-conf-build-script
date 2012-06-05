var crypto = require('crypto');

module.exports = function(text){
  var md5 = crypto.createHash('md5');
  md5.update(text);

  return md5.digest('hex').slice(0,6);
};
