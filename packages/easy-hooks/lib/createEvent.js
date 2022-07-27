"use strict";

exports.__esModule = true;
exports.createEvent = void 0;

var _utils = require("./utils");

const createEvent = function createEvent(domElementOrRef, eventName, eventListener, options = false) {
  const eventNames = Array.isArray(eventName) ? eventName : [eventName];
  const element = (0, _utils.getElement)(domElementOrRef);

  if (element) {
    eventNames.forEach(name => element.addEventListener(name, eventListener, options));
    return () => eventNames.forEach(name => element.removeEventListener(name, eventListener, options));
  }
};

exports.createEvent = createEvent;