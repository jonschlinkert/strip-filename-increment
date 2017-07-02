'use strict';

var path = require('path');

module.exports = function(filename) {
  filename = stripIncrement(filename);
  var dirname = path.dirname(filename);
  var ext = path.extname(filename);
  var stem = path.basename(filename, ext);
  var name = stripIncrement(stem);
  return path.join(dirname, name + ext);
};

function stripIncrement(name) {
  var regex = /(\s+\([0-9]+\)|[ -]+copy *[0-9]*|\.\(incomplete\))$/i;
  var match;
  while ((match = regex.exec(name))) {
    name = name.slice(0, match.index);
  }
  return name;
}
