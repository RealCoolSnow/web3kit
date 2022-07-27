"use strict";

exports.__esModule = true;
exports.useEvent = void 0;

var _react = require("react");

var _createEvent = require("./createEvent");

const useEvent = function useEvent(domElementOrRef, eventName, eventListener, options = false, deps = []) {
  const eventNames = Array.isArray(eventName) ? eventName : [eventName];
  (0, _react.useEffect)(() => (0, _createEvent.createEvent)(domElementOrRef, eventNames, eventListener, options), [domElementOrRef, ...eventNames, ...deps]);
};

exports.useEvent = useEvent;