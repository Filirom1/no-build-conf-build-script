var cheerio = require("cheerio"),
         fs = require('fs'),
       Path = require('path'),
      async = require('async'),
     mkdirp = require('mkdirp'),
       util = require('util'),
       glob = require('glob'),
        log = require('npmlog'),
        rimraf = require('rimraf'),
        ncp = require('ncp').ncp;

var that = this,
 PROCESSORS_PATH = 'processors/dom';

function readHtml(file, cb){
  log.silly('html', 'Read file', file);
  fs.readFile(file , function(err, text){
    if(err) return cb(err);
    // get a jQuery like HTML
    var $ = cheerio.load(text);
    cb(null, $);
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
    var groupByDataBuild = {},
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
  log.silly('html', 'Html parsed into', groupByDataBuild);
  return groupByDataBuild;
}

module.exports = function build(fromDir, outDir, processors, cb){
  log.silly('build', 'using processors', processors);
  var from = Path.join(fromDir, 'index.html');
  var newFile = Path.join(outDir, 'index.html');

  log.info('build', 'rm -rf', outDir);
  rimraf(outDir, function(err){
    log.info('build', 'mkdir -p', outDir);
    mkdirp(outDir, function(err){
      log.info('build', 'cp -r', fromDir, outDir);
      ncp(fromDir, outDir, function(err){
        if(err) return cb(err);

        // parse the index.html
        readHtml(from, function(err, $){
          if(err) return cb(err);

          // Apply all processors in order
          async.forEachSeries(processors, process, cb);

          function process(processor, callback){
            log.silly('build', 'process', processor);
            if(processor.el) {
              processDom.apply(this, arguments);
            }else if(processor.glob){
              processFile.apply(this, arguments);
            }
          }

          function processFile(processor, callback){
            glob(processor.glob, {cwd: outDir}, function(err, files){
              log.silly('build', 'Files to process', files);
              files = files.map(function(file){
                return Path.join(outDir, file);
              });
              processor.process(files, callback);
            });
          }

          function processDom(processor, callback){
            // parse the index.html
            var data = parseHtml($, processor.el);

            // and do the optimization
            processor.process($, outDir, data, function(err){
              if(err) return callback(err);
              var html = $.html();
              log.info('build', 'write file', newFile);
              fs.writeFile(newFile, html, function(err){
                if(err) return callback(err);
                return callback(null, newFile);
              });
            });
          }
        });
      });
    });
  });
};

