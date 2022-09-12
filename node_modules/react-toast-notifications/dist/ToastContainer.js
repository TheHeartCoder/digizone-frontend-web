'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require('@emotion/core');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = require('react-transition-group');

var _ToastElement = require('./ToastElement');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
/** @jsx jsx */

var placements = {
  'top-left': { top: 0, left: 0 },
  'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: 0, right: 0 },
  'bottom-left': { bottom: 0, left: 0 },
  'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: 0, right: 0 }
};

var ToastContainer = function ToastContainer(_ref) {
  var hasToasts = _ref.hasToasts,
      placement = _ref.placement,
      props = _objectWithoutProperties(_ref, ['hasToasts', 'placement']);

  return (0, _core.jsx)('div', _extends({
    className: 'react-toast-notifications__container',
    css: _extends({
      boxSizing: 'border-box',
      maxHeight: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      padding: _ToastElement.gutter,
      pointerEvents: hasToasts ? null : 'none',
      position: 'fixed',
      zIndex: 1000
    }, placements[placement])
  }, props));
};
exports.ToastContainer = ToastContainer;