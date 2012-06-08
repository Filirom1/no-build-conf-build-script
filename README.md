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

    $ git clone https://github.com/Backbonist/no-build-conf-build-script.git
    $ cd h5bp-build-script-tags
    $ [sudo] npm install -g


### Use the build script

  $ build-html inputdir outputdir

### Result

The result is an optimized directory:

The previous HTML portion now look like this:

    <link rel="stylesheet" href="app.459703.css" data-build="app.css">
    <script src="app.6423e0.js" data-build="app.js"></script>

CSS and JS are:

* minified
* merged
* MD5'd

