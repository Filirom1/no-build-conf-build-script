No build conf - build script
----------------------------

Optimize your SPA programmatically.

This project is greatly inspired by [@mklabs](https://github.com/mklabs) works.

![Bulldozer](raw/master/draft.png)

Tested on Linux and Windows.

### HTML modification

Add `"data-build"="NAME_OF_THE_OPTIMIZED_ASSET"` to every assets (css or js) you want to
optimize. Here `app.css` and `app.js`.

    <link rel="stylesheet" href="css/style.css" data-build="app.css">

    <!-- scripts concatenated and minified via build script -->
    <script src="vendor/log.js" data-build="app.js"></script>
    <script src="vendor/underscore.js" data-build="app.js"></script>
    <script src="vendor/backbone.js" data-build="app.js"></script>
    <script src="vendor/handlebars.runtime-1.0.0.beta.6.js" data-build="app.js"></script>
    <script src="application.js" data-build="app.js"></script>
    <script src="lib/util.js" data-build="app.js"></script>
    <script src="lib/jquery.plugin.js" data-build="app.js"></script>
    <script src="lib/Backbone.plugin.js" data-build="app.js"></script>
    <script src="model/Todo.js" data-build="app.js"></script>
    <script src="template/templates.js" data-build="app.js"></script>
    <script src="view/todo/TodoView.js" data-build="app.js"></script>
    <script src="Router.js" data-build="app.js"></script>
    <!-- end scripts -->

### Result

The result is an optimized directory:

The previous HTML portion now look like this:

    <link rel="stylesheet" href="app.459703.css" data-build="app.css">
    <script src="app.6423e0.js" data-build="app.js"></script>

CSS and JS are:

* minified
* merged
* MD5'd

### Install this project

You need [nodejs installed](http://nodejs.org/#download).

    $ [sudo] npm install -g no-build-conf


### Use the build script as a CLI

    $ build-html example/in example/out
    info <font color="purple">build</font> rm -rf example/out/
    info <font color="purple">build</font>  mkdir -p example/out/
    info <font color="purple">build</font>  cp -r example/in/ example/out/
    info <font color="purple">less</font>  parse example/out/css/normalize.less
    info <font color="purple">less</font>  parse example/out/css/style.less
    info <font color="purple">less</font>  parse example/out/css/todo.less
    info <font color="purple">less</font>  parse example/out/css/utils.less
    info <font color="purple">less</font>  write example/out/css/normalize.css
    info <font color="purple">less</font>  write example/out/css/todo.css
    info <font color="purple">less</font>  write example/out/css/utils.css
    info <font color="purple">less</font>  write example/out/css/style.css
    info <font color="purple">optipng</font>  optimize [ 'example/out/img/fr.png', 'example/out/img/information.png' ]
    info <font color="purple">optipng</font>  /usr/bin/optipng -quiet example/out/img/fr.png example/out/img/information.png
    info <font color="purple">jpegtran</font>  /usr/bin/jpegtran -copy none -optimize -outfile jpg-tmp.jpg example/out/img/cc-logo.jpg
    info <font color="purple">jpegtran</font>  /usr/bin/jpegtran -copy none -optimize -outfile jpg-tmp.jpg example/out/img/mid-Creative_Commons_and_Commerce.ogg.jpg
    info <font color="purple">concat</font>  Concat files in example/out/ [ 'vendor/log.js',
    info <font color="purple">concat</font>    'vendor/underscore.js',
    info <font color="purple">concat</font>    'vendor/backbone.js',
    info <font color="purple">concat</font>    'vendor/handlebars.runtime-1.0.0.beta.6.js',
    info <font color="purple">concat</font>    'application.js',
    info <font color="purple">concat</font>    'lib/util.js',
    info <font color="purple">concat</font>    'lib/jquery.plugin.js',
    info <font color="purple">concat</font>    'lib/Backbone.plugin.js',
    info <font color="purple">concat</font>    'model/Todo.js',
    info <font color="purple">concat</font>    'template/templates.js',
    info <font color="purple">concat</font>    'view/todo/TodoView.js',
    info <font color="purple">concat</font>    'Router.js' ]
    info <font color="purple">js</font>  minify js
    info <font color="purple">md5</font>  compute md5
    info <font color="purple">link</font>  write example/out/app-6423e0.js
    info <font color="purple">css</font>  minify css example/out/css/style.css
    WARN <font color="purple">css-b64-images</font>  [ [Error: Skip ../fonts/maven_pro_medium-webfont.eot Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../fonts/maven_pro_medium-webfont.eot?iefix Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../fonts/maven_pro_medium-webfont.woff Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../fonts/maven_pro_medium-webfont.ttf Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../fonts/maven_pro_medium-webfont.svg#webfontyQA0TEWF Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../fonts/callunasansregular-webfont.eot Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../fonts/callunasansregular-webfont.eot?#iefix Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../fonts/callunasansregular-webfont.woff Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../fonts/callunasansregular-webfont.ttf Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../fonts/callunasansregular-webfont.svg#webfontW850hM1B Exceed max size],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip http://pullrequest.org/img/background-pattern.gif External file.],
    WARN <font color="purple">css-b64-images</font>    [Error: Skip ../img/mixit-banner.png Exceed max size],
    WARN <font color="purple">css-b64-images</font>    { [Error: ENOENT, stat 'example/out/img/nlabal.png'] errno: 34, code: 'ENOENT', path: 'example/out/img/nlabal.png' } ]
    info <font color="purple">md5</font>  compute md5
    info <font color="purple">link</font>  write example/out/css/app-503e33.css
    info <font color="purple">build</font>  create file example/out/index.html
    info <font color="purple">html-minifier</font>  optimize example/out/index.html
    info <font color="purple">bin</font>  Build done in 1327 ms


### Use the build script as a library

The no-build-conf build script works like connect middlewares.

Here processors/middlewares [less](http://lesscss.org/), [optipng](http://optipng.sourceforge.net/), [jpegtran](http://jpegclub.org/jpegtran/), script, link, [css-b64-images](https://github.com/Filirom1/css-base64-images), [html-minifier](https://github.com/kangax/html-minifier) are applied in order.

    var buildScript = require('no-build-conf');

    var processors = [
      require('no-build-conf/lib/processors/file/less'),
      require('no-build-conf/lib/processors/file/optipng'),
      require('no-build-conf/lib/processors/file/jpegtran'),
      require('no-build-conf/lib/processors/dom/script'),
      require('no-build-conf/lib/processors/dom/link'),
      require('no-build-conf/lib/processors/dom/css-b64-images'),
      require('no-build-conf/lib/processors/file/html-minifier')
    ];

    build(target_dir, output_dir, processors, function(err, newFile){
        if(err) throw err;
        console.log('Build done ✔');
    });

There is two sorts of processors:

* file processors
* dom processors

#### File processors

File processors take a list of files as argument.

In the following example, the argument file will contain an array of every png images in the directory.
For more information about the [Glob pattern](https://github.com/isaacs/node-glob).

    module.exports = {
      glob: '**/*.png',

      process: function(files, next){ 
        //...
      }
    }


#### Dom processors

Dom processors take a list of DOM element as argument.

$ is based on a jQuery-like implementation: [Cheerio](https://github.com/MatthewMueller/cheerio) that works on Unix and Windows.

    module.exports = {
      el: 'link[data-build] href',

      process: function($, dir, links, next){
        if(!links) return next();
        var keys = Object.keys(links);
        if(!keys.length) return next();
        keys.forEach(function(key){
          var hrefs = links[key];
          //...

        }
      }
    }

## License

Everything original is MIT, everything else honors whatever license it was written under.
