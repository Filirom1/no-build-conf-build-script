#!/usr/bin/env node

var build = require('../lib/build'),
  Path = require('path'),
  fs = require('fs'),
  log = require('npmlog'),
  usage = "Usage: build-html inputdir outputdir";



var args = process.argv.slice(0);
// shift off node and script name
args.shift(); args.shift();

var target_dir = args[0],
  output_dir = args[1];

if(!target_dir || !output_dir) return console.error(usage);

fs.lstat(output_dir, function(err){
  if(err){
    fs.mkdirSync(output_dir);
  }

  var processors = [
    require('../lib/processors/file/less'),
    require('../lib/processors/file/optipng'),
    require('../lib/processors/file/jpegtran'),
    require('../lib/processors/dom/script'),
    require('../lib/processors/dom/link'),
    require('../lib/processors/dom/css-b64-images'),
    require('../lib/processors/dom/exclude'),
    require('../lib/processors/file/html-minifier')
  ];

  var begin = new Date();
  build(target_dir, output_dir, processors, function(err, newFile){
      if(err){
        throw err;
      }
      log.info('bin', 'Build done in', new Date() - begin, 'ms' );
  });
});
