var uglify = require('uglify-js'),
  log = require('npmlog');

function min(source) {
  log.info('js', 'minify js');
  var jsp = uglify.parser,
    pro = uglify.uglify,
    ast = jsp.parse(source);

  ast = pro.ast_mangle(ast);
  ast = pro.ast_squeeze(ast);
  return pro.gen_code(ast);
}

module.exports = min;
