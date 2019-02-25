'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

exports.default = function (wait, opts) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var func = args[2].value;
    return (0, _lodash.debounce)(func, wait, opts);
  };
};

module.exports = exports['default'];