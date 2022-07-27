"use strict";

exports.__esModule = true;
exports.getDocument = getDocument;
exports.getDocumentElement = getDocumentElement;
exports.getElement = getElement;
exports.getWindow = getWindow;
exports.resolveState = resolveState;

function getElement(selectorsOrElementOrRef) {
  if (!selectorsOrElementOrRef) {
    return null;
  }

  if (typeof selectorsOrElementOrRef === 'string') {
    if (typeof document !== 'undefined') {
      return document.querySelector(selectorsOrElementOrRef);
    }
  } else if ('dispatchEvent' in selectorsOrElementOrRef) {
    return selectorsOrElementOrRef;
  } else {
    return selectorsOrElementOrRef.current;
  }

  return null;
}

function getWindow() {
  return typeof window === 'undefined' ? null : window;
}

function getDocument() {
  return typeof document === 'undefined' ? null : document;
}

function getDocumentElement() {
  return typeof document === 'undefined' ? null : document.documentElement;
}

function resolveState(state, current) {
  if (typeof state === 'function') {
    return state(current);
  }

  return state;
}