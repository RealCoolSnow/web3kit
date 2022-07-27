"use strict";

exports.__esModule = true;

var _createEvent = require("./createEvent");

Object.keys(_createEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createEvent[key]) return;
  exports[key] = _createEvent[key];
});

var _useEvent = require("./useEvent");

Object.keys(_useEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useEvent[key]) return;
  exports[key] = _useEvent[key];
});