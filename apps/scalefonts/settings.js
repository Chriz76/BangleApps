(function(back) {
  var FILE = "scalefonts.json";
  // Load settings
  var settings = Object.assign({
    large: false,
  }, require('Storage').readJSON(FILE, true) || {});

  function writeSettings() {
    require('Storage').writeJSON(FILE, settings);
  }

  // Show the menu
  E.showMenu({
    "" : { "title" : "Scale fonts" },
    "< Back" : () => back(),
    'Large': {
      value: !!settings.large,  // !! converts undefined to false
      onchange: v => {
        settings.large = v;
        writeSettings();
      }
    },
  });
})
