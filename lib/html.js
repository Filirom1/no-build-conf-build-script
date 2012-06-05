var cheerio = require("cheerio"),
         fs = require('fs'),
       path = require('path'),
      async = require('async'),
     mkdirp = require('mkdirp'),
       util = require('util'),
        ncp = require('ncp').ncp;

var that = this,
 PROCESSORS_PATH = 'processors';

function readHtml(file, cb){
  fs.readFile(file , function(err, text){
    if(err) return cb(err);
    // get a jQuery like HTML
    var $ = cheerio.load(text);
    cb(null, $)
  });
}

// Parse the HTML with a jquery like parser (cheerio), and return in the callback jquery, and an object like this :
//
// {
//   dataBuildId1: ['vendor/jquery.js', 'vendor/underscore.js', 'vendor/backbone.js', ...],
//   dataBuildId2: ['application.js', 'model/todo.js', ...]
// }
//
function parseHtml($, el, cb){
    groupByDataBuild = {},
    selector = el.split(' ')[0],
    attribute = el.split(' ')[1];

  // Processor are limited in manipulating index.html to a `selector`
  $(selector).each(function(){
    var $el = $(this);
    var attrs = $el.attr();
    var dataBuild = attrs['data-build'];
    var group = groupByDataBuild[dataBuild] = groupByDataBuild[dataBuild] || [];
    group.push(attrs[attribute]);
  });
  return groupByDataBuild;
}

module.exports = function build(fromDir, outDir, cb){
  var from = path.join(fromDir, 'index.html');
  var newFile = path.join(outDir, 'index.html');
  ncp(fromDir, outDir, function(err){
    if(err) return cb(err);

    // parse the index.html
    readHtml(from, function(err, $){
      if(err) return cb(err);

      // Load each processors
      fs.readdir(path.join(__dirname, PROCESSORS_PATH), function(err, processors){
        if(err) return cb(err);
        // Be sure to only load `.js` files
        processors = processors.filter(function(processor){ return /\.js$/.test(processor); });

        async.forEach(processors, process, afterProcess);

        function process(processorPath, cb){
          var processor = require('./' + path.join(PROCESSORS_PATH, processorPath).replace(/\.js/g,''));

          // parse the index.html
          var data = parseHtml($, processor.el);

          // and do the optimization
          processor.process($, fromDir, outDir, data, function(err){
            if(err) return cb(err);
            cb(null);
          });
        }

        function afterProcess(){
          var html = $.html();
          mkdirp(path.dirname(newFile), function(err){
            if(err) return cb(err);
            fs.writeFile(newFile, html, function(err){
              if(err) return cb(err);
              return cb(null, newFile);
            });
          });
        }
      });
    });
  });
};
