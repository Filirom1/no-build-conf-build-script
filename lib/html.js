var cheerio = require("cheerio"),
         fs = require('fs'),
       path = require('path'),
     mkdirp = require('mkdirp'),
       util = require('util'),
        ncp = require('ncp').ncp;

var that = this;

function readHtml(file, cb){
  fs.readFile(file , function(err, text){
    if(err) return cb(err);
    parseHtml(text, cb);
  });
}

// Parse the HTML with a jquery like parser (cheerio), and return in the callback jquery, and an object like this :
//
// {
//   link: {
//     mergedCSS1: [attrs1, attrs2, attrs3, ...],
//     mergedCSS2: [attrs1, attrs2, attrs3, ...]
//   },
//   script: {
//     mergeJS1: [attrs1, attrs2, attrs3, ...],
//   }
// }
//
function parseHtml(text, cb){
  var $ = cheerio.load(text);
  var groupByTagName = {};
  $('[data-build]').each(function(){
    var $el = $(this);
    var tagName = $el[0].name;
    var attrs = $el.attr();
    var dataBuild = attrs['data-build'];
    var groupByDataBuild = groupByTagName[tagName] = groupByTagName[tagName] || {};
    var group = groupByDataBuild[dataBuild] = groupByDataBuild[dataBuild] || [];
    group.push(attrs);
  });
  cb(null, $, groupByTagName);
}

module.exports = function build(fromDir, outDir, cb){
  var from = path.join(fromDir, 'index.html');
  var newFile = path.join(outDir, 'index.html');
  ncp(fromDir, outDir, function(err){
    if(err) return cb(err);
    readHtml(from, function(err, $, data){
      if(err) return cb(err);

      // Load each processors
      ['link', 'script'].forEach(function(name){
        var processor = require('./processors/' + name);
        processor.process($, fromDir, outDir, data, function(err){
          if(err) cb(err);
        });
      });

      var html = $.html();
      mkdirp(path.dirname(newFile), function(err){
        if(err) return cb(err);
        fs.writeFile(newFile, html, function(err){
          if(err) return cb(err);
          return cb(null, newFile);
        });
      });
    });
  });
};
