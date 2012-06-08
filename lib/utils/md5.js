var crypto = require('crypto'),
  log = require('npmlog');

module.exports = function(text){
  log.info('md5', 'compute md5');
  var md5 = crypto.createHash('md5');
  md5.update(text);

  return md5.digest('hex').slice(0,6);
};
