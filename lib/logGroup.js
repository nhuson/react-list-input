"use strict";

exports.__esModule = true;

exports.default = function (name, obj) {
  console.groupCollapsed(name);
  console.log(obj);
  console.groupEnd();
};

module.exports = exports["default"];