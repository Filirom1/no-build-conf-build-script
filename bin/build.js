#!/usr/bin/env node

var build = require('../lib/html'),
  Path = require('path'),
  fs = require('fs'),
  usage = "Usage: build-html inputdir outputdir";



var args = process.argv.slice(0);
// shift off node and script name
args.shift(); args.shift();

var target_dir = args[0],
  output_dir = args[1];

if(!target_dir || !output_dir) return console.error(usage);

fs.lstat(output_dir, function(err){
  if(err){
    fs.mkdirSync(output_dir);
  }
  build(target_dir, output_dir, function(err, newFile){
      if(err){
        console.error(err.message);
        process.exit(-1);
      }
      console.log('✔ ' + newFile);
  });
})


