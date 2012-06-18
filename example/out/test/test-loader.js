Modernizr.load({
  test: /test/.test(location.hostname),
  yep: ["/test/chai.js", "/test/chai-jquery.js", "/test/mocha.js"],
  complete: function(){
    if(!/test/.test(location.hostname)) return;
    mocha.setup('bdd');
    Modernizr.load({
      load: ["/test/test.web.js"],
      complete: function(){
        $(function(){
          mocha.run();
        });
      }
    });
  }
});
