var scaleFontsSettings = Object.assign({
  // default values
  large: false,
}, require('Storage').readJSON("scalefonts.json", true) || {});

function setFontPBF(name) {
  return g.setFontPBF(require("Storage").read("scalefonts." + name + ".pbf"));
}

function mapFont(name, size) {
  let f = normalizeFont(name, size);
  
  if (scaleFontsSettings.large)
  {
    if (f.name == "6x8" && f.size == 4
      || f.name == "6x15" && f.size == 2 
      || f.name == "8x12" && (f.size == 3 || f.size == 4)
      || f.name == "12x20" && f.size == 2
      || f.name == "Vector" && f.size > 30 && f.size < 50) {
      return setFontPBF("36");
    }
    if (f.name == "6x8" && f.size == 3
      || f.name == "Vector" && f.size > 17 && f.size <= 30) {
      return setFontPBF("28b");
    } 
    if (f.name == "8x12" && f.size == 2
      || f.name == "12x20" && f.size == 1) {
      return setFontPBF("28");
    }
    if (f.name == "6x8" && f.size == 2
      || f.name == "6x15" && f.size == 1
      || f.name == "Vector" && f.size > 14 && f.size <= 17) {
      return setFontPBF("24b");
    }
    if ( f.name == "8x12" && f.size == 1
      || f.name == "Vector" && f.size > 10 && f.size <=14 ) {
      return setFontPBF("18b");
    }
  } else {
    if (f.name == "6x8" && f.size == 4
      || f.name == "6x15" && f.size == 3
      || f.name == "8x12" && (f.size == 3 || f.size == 4)
      || f.name == "12x20" && f.size == 2
      || f.name == "Vector" && f.size > 30 && f.size < 50) {
      return setFontPBF("36");
    }
    if (f.name == "6x15" && f.size == 2) {
      return setFontPBF("28");
    }
    if (f.name == "6x8" && f.size == 3
      || f.name == "Vector" && f.size > 24 && f.size <= 30) {
      return setFontPBF("28b");
    }
    if (f.name == "12x20" && f.size == 1
      || f.name == "Vector" && f.size > 20 && f.size <= 24) {
        return setFontPBF("24b");
    }
    if (f.name == "8x12" && f.size == 2
      || f.name == "Vector" && f.size > 17 && f.size <= 20) {
        return setFontPBF("24");
    }  
    if (f.name == "6x8" && f.size == 2
      || f.name == "6x15" && f.size == 1
      || f.name == "Vector" && f.size > 12 && f.size <= 17) {
        return setFontPBF("18b");
    } 
    if (f.name == "8x12" && f.size == 1
       || f.name == "Vector" && f.size > 9 && f.size <= 12) {
      return setFontPBF("14");
    }       
  }
  return false;
}

function normalizeFont(name, size) {
  if (typeof size === 'undefined') {
    size = 1;
  }
  
	let font = {name: name, size: Number(size)};

  let delimiterPos = font.name.indexOf(":");
  
  if (delimiterPos > 0) {
    size = font.name.substring(delimiterPos+1);
    if (size.indexOf("x") == -1) {
      font.size=Number(size);
      font.name = font.name.substring(0, delimiterPos);
    }
  } else if (font.name.startsWith("Vector") && font.name.length > 6) {
    font.size = Number(font.name.substring(6));
    font.name = "Vector";
  }
  
  if (typeof font.size === 'undefined') {
    font.size = 1;
  }

  if (font.size < 1) {
    font.size = 1;
  }

	return font;
}

g.OldsetFont6x15 = g.setFont6x15;
g.setFont6x15 = function(size) {
  if (!mapFont("6x15", size)) {
    g.OldsetFont6x15(size);
  }
  return g;
};

g.OldsetFontVector = g.setFontVector;
g.setFontVector = function(size) {
  if (!mapFont("Vector", size)) {
    g.OldsetFontVector(size);
  }
  return g;
};

g.OldsetFont12x20 = g.setFont12x20;
g.setFont12x20 = function(size) {
  if (!mapFont("12x20", size)) {
    g.OldsetFont12x20(size);
  }
  return g;
};

g.OldsetFont = g.setFont;
g.setFont = function(name, size) {
  if (!mapFont(name, size)) {
    g.OldsetFont(name, size);
  }
  return g;
};
