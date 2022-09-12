'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUEID = generateUEID;
var NOOP = exports.NOOP = function NOOP() {};
function generateUEID() {
  var first = Math.random() * 46656 | 0;
  var second = Math.random() * 46656 | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);
  return first + second;
}