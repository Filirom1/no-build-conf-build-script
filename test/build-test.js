var buildScript = require('../lib/build'),
  rimraf = require('rimraf'),
  Path = require('path'),
  fs = require('fs'),
  connect = require('connect'),
  Browser = require('zombie');

require('should');

var inPath = Path.resolve(__dirname, '..', 'example', 'in'),
  outPath = Path.resolve(__dirname, '..', 'example', 'out');


describe('When building `example/in` into `example/out`', function(){
  it('should be optimized and readable by a browser', function(done){
    rimraf(outPath, function(err){
      if (err) throw err;
      fs.mkdir(outPath, function(err){
        if (err) throw err;
        var processors = [
          require('../lib/processors/file/less'),
          require('../lib/processors/dom/script'),
          require('../lib/processors/dom/link')
        ];
        buildScript(inPath, outPath, processors, function(err){
          if (err) throw err;
          createHttpServer(3000, outPath, function(err){
            if (err) throw err;
            new Browser().visit("http://localhost:3000/", function(err, browser){
              if (err) throw err;
              browser.queryAll('script[data-build]').should.have.length(1);
              browser.queryAll('link[data-build]').should.have.length(1);
              done();
              browser.html().should.include('A custom paragraph here.');
            });
          });
        });
      });
    });
  });
});

function createHttpServer(port, path, cb){
  var server = connect();
  server.use(connect.static(path));
  server.listen(port, cb);
}
