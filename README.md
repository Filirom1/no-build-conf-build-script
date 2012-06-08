No build conf - build script
----------------------------

This project is greatly inspired by <https://github.com/mklabs/h5bp-build-script-tags>. [@mklabs](https://github.com/mklabs) You rock !!!

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

### Install this project

You need [nodejs installed](http://nodejs.org/#download).

    $ [sudo] npm install -g no-build-conf


### Use the build script as a CLI

    $ build-html inputdir outputdir
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
    info md5 compute md5
    info link write example/out/css/app-503e33.css
    info build create file example/out/index.html
    info bin Build done ✔


### Use the build script as a library

    var buildScript = require('no-build-conf');

    var processors = [
      require('no-build-conf/lib/processors/file/less'),
      require('no-build-conf/lib/processors/dom/script'),
      require('no-build-conf/lib/processors/dom/link')
    ];

    build(target_dir, output_dir, processors, function(err, newFile){
        if(err) throw err;
        console.log('Build done ✔');
    });


### Result

The result is an optimized directory:

The previous HTML portion now look like this:

    <link rel="stylesheet" href="app.459703.css" data-build="app.css">
    <script src="app.6423e0.js" data-build="app.js"></script>

CSS and JS are:

* minified
* merged
* MD5'd

