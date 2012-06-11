No build conf - build script
----------------------------

Optimize your SPA programmatically.

This project is greatly inspired by [@mklabs](https://github.com/mklabs) works.

![Bulldozer](draft.png)

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
    info build rm -rf example/out/
    info build mkdir -p example/out/
    info build cp -r example/in/ example/out/
    info less parse example/out/css/normalize.less
    info less parse example/out/css/style.less
    info less parse example/out/css/todo.less
    info less parse example/out/css/utils.less
    info less write example/out/css/normalize.css
    info less write example/out/css/todo.css
    info less write example/out/css/utils.css
    info less write example/out/css/style.css
    info optipng optimize [ 'example/out/img/fr.png', 'example/out/img/information.png' ]
    info optipng /usr/bin/optipng -quiet example/out/img/fr.png example/out/img/information.png
    info jpegtran /usr/bin/jpegtran -copy none -optimize -outfile jpg-tmp.jpg example/out/img/cc-logo.jpg
    info jpegtran /usr/bin/jpegtran -copy none -optimize -outfile jpg-tmp.jpg example/out/img/mid-Creative_Commons_and_Commerce.ogg.jpg
    info concat Concat files in example/out/ [ 'vendor/log.js',
    info concat   'vendor/underscore.js',
    info concat   'vendor/backbone.js',
    info concat   'vendor/handlebars.runtime-1.0.0.beta.6.js',
    info concat   'application.js',
    info concat   'lib/util.js',
    info concat   'lib/jquery.plugin.js',
    info concat   'lib/Backbone.plugin.js',
    info concat   'model/Todo.js',
    info concat   'template/templates.js',
    info concat   'view/todo/TodoView.js',
    info concat   'Router.js' ]
    info js minify js
    info md5 compute md5
    info link write example/out/app-6423e0.js
    info css minify css example/out/css/style.css
    WARN css-b64-images [ [Error: Skip ../fonts/maven_pro_medium-webfont.eot Exceed max size],
    WARN css-b64-images   [Error: Skip ../fonts/maven_pro_medium-webfont.eot?iefix Exceed max size],
    WARN css-b64-images   [Error: Skip ../fonts/maven_pro_medium-webfont.woff Exceed max size],
    WARN css-b64-images   [Error: Skip ../fonts/maven_pro_medium-webfont.ttf Exceed max size],
    WARN css-b64-images   [Error: Skip ../fonts/maven_pro_medium-webfont.svg#webfontyQA0TEWF Exceed max size],
    WARN css-b64-images   [Error: Skip ../fonts/callunasansregular-webfont.eot Exceed max size],
    WARN css-b64-images   [Error: Skip ../fonts/callunasansregular-webfont.eot?#iefix Exceed max size],
    WARN css-b64-images   [Error: Skip ../fonts/callunasansregular-webfont.woff Exceed max size],
    WARN css-b64-images   [Error: Skip ../fonts/callunasansregular-webfont.ttf Exceed max size],
    WARN css-b64-images   [Error: Skip ../fonts/callunasansregular-webfont.svg#webfontW850hM1B Exceed max size],
    WARN css-b64-images   [Error: Skip http://pullrequest.org/img/background-pattern.gif External file.],
    WARN css-b64-images   [Error: Skip ../img/mixit-banner.png Exceed max size],
    WARN css-b64-images   { [Error: ENOENT, stat 'example/out/img/nlabal.png'] errno: 34, code: 'ENOENT', path: 'example/out/img/nlabal.png' } ]
    info md5 compute md5
    info link write example/out/css/app-503e33.css
    info build create file example/out/index.html
    info html-minifier optimize example/out/index.html
    info bin Build done in 1327 ms


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
