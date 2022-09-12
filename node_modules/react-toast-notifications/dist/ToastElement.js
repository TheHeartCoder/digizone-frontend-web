'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultToast = exports.shrinkKeyframes = exports.toastWidth = exports.gutter = exports.borderRadius = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['from { height: 100%; } to { height: 0% }'], ['from { height: 100%; } to { height: 0% }']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('@emotion/core');

var _icons = require('./icons');

var _colors = require('./colors');

var colors = _interopRequireWildcard(_colors);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
/** @jsx jsx */

// common
var borderRadius = exports.borderRadius = 4;
var gutter = exports.gutter = 8;
var toastWidth = exports.toastWidth = 360;
var shrinkKeyframes = exports.shrinkKeyframes = (0, _core.keyframes)(_templateObject);

// a11y helper
var A11yText = function A11yText(_ref) {
  var Tag = _ref.tag,
      props = _objectWithoutProperties(_ref, ['tag']);

  return (0, _core.jsx)(Tag, _extends({
    css: {
      border: 0,
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1
    }
  }, props));
};
A11yText.defaultProps = {
  tag: 'span'
};

// default appearances

var appearances = {
  success: {
    icon: _icons.CheckIcon,
    text: colors.G500,
    fg: colors.G300,
    bg: colors.G50
  },
  error: {
    icon: _icons.FlameIcon,
    text: colors.R500,
    fg: colors.R300,
    bg: colors.R50
  },
  warning: {
    icon: _icons.AlertIcon,
    text: colors.Y500,
    fg: colors.Y300,
    bg: colors.Y50
  },
  info: {
    icon: _icons.InfoIcon,
    text: colors.N400,
    fg: colors.B200,
    bg: 'white'
  }
};


var Button = function Button(props) {
  return (0, _core.jsx)('div', _extends({
    role: 'button',
    className: 'react-toast-notifications__toast__dismiss-button',
    css: {
      cursor: 'pointer',
      flexShrink: 0,
      opacity: 0.5,
      padding: gutter + 'px ' + gutter * 1.5 + 'px',
      transition: 'opacity 150ms',

      ':hover': { opacity: 1 }
    }
  }, props));
};

var Content = function Content(props) {
  return (0, _core.jsx)('div', _extends({
    className: 'react-toast-notifications__toast__content',
    css: {
      flexGrow: 1,
      fontSize: 14,
      lineHeight: 1.4,
      minHeight: 40,
      padding: gutter + 'px ' + gutter * 1.5 + 'px'
    }
  }, props));
};

// NOTE: invoke animation when NOT `autoDismiss` with opacity of 0 to avoid a
// paint bug in FireFox.
// https://bugzilla.mozilla.org/show_bug.cgi?id=625289
var Countdown = function Countdown(_ref2) {
  var autoDismissTimeout = _ref2.autoDismissTimeout,
      opacity = _ref2.opacity,
      isRunning = _ref2.isRunning,
      props = _objectWithoutProperties(_ref2, ['autoDismissTimeout', 'opacity', 'isRunning']);

  return (0, _core.jsx)('div', _extends({
    className: 'react-toast-notifications__toast__countdown',
    css: {
      animation: shrinkKeyframes + ' ' + autoDismissTimeout + 'ms linear',
      animationPlayState: isRunning ? 'running' : 'paused',
      backgroundColor: 'rgba(0,0,0,0.1)',
      bottom: 0,
      height: 0,
      left: 0,
      opacity: opacity,
      position: 'absolute',
      width: '100%'
    }
  }, props));
};

var Icon = function Icon(_ref3) {
  var appearance = _ref3.appearance,
      autoDismiss = _ref3.autoDismiss,
      autoDismissTimeout = _ref3.autoDismissTimeout,
      isRunning = _ref3.isRunning;

  var meta = appearances[appearance];
  var Glyph = meta.icon;

  return (0, _core.jsx)(
    'div',
    {
      className: 'react-toast-notifications__toast__icon-wrapper',
      css: {
        backgroundColor: meta.fg,
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        color: meta.bg,
        flexShrink: 0,
        paddingBottom: gutter,
        paddingTop: gutter,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        width: 30
      }
    },
    (0, _core.jsx)(Countdown, {
      opacity: autoDismiss ? 1 : 0,
      autoDismissTimeout: autoDismissTimeout,
      isRunning: isRunning
    }),
    (0, _core.jsx)(Glyph, {
      className: 'react-toast-notifications__toast__icon',
      css: { position: 'relative', zIndex: 1 }
    })
  );
};

// Transitions
// ------------------------------

function getTranslate(placement) {
  var pos = placement.split('-');
  var relevantPlacement = pos[1] === 'center' ? pos[0] : pos[1];
  var translateMap = {
    right: 'translate3d(120%, 0, 0)',
    left: 'translate3d(-120%, 0, 0)',
    bottom: 'translate3d(0, 120%, 0)',
    top: 'translate3d(0, -120%, 0)'
  };

  return translateMap[relevantPlacement];
}

var toastStates = function toastStates(placement) {
  return {
    entering: { transform: getTranslate(placement) },
    entered: { transform: 'translate3d(0,0,0)' },
    exiting: { transform: 'scale(0.66)', opacity: 0 },
    exited: { transform: 'scale(0.66)', opacity: 0 }
  };
};

var ToastElement = function ToastElement(_ref4) {
  var appearance = _ref4.appearance,
      placement = _ref4.placement,
      transitionDuration = _ref4.transitionDuration,
      transitionState = _ref4.transitionState,
      props = _objectWithoutProperties(_ref4, ['appearance', 'placement', 'transitionDuration', 'transitionState']);

  var _useState = (0, _react.useState)('auto'),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  var elementRef = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    if (transitionState === 'entered') {
      var el = elementRef.current;
      setHeight(el.offsetHeight + gutter);
    }
    if (transitionState === 'exiting') {
      setHeight(0);
    }
  }, [transitionState]);

  return (0, _core.jsx)(
    'div',
    {
      ref: elementRef,
      style: { height: height },
      css: {
        transition: 'height ' + (transitionDuration - 100) + 'ms 100ms'
      }
    },
    (0, _core.jsx)('div', _extends({
      className: 'react-toast-notifications__toast react-toast-notifications__toast--' + appearance,
      css: _extends({
        backgroundColor: appearances[appearance].bg,
        borderRadius: borderRadius,
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.175)',
        color: appearances[appearance].text,
        display: 'flex',
        marginBottom: gutter,
        maxWidth: '100%',
        transition: 'transform ' + transitionDuration + 'ms cubic-bezier(0.2, 0, 0, 1), opacity ' + transitionDuration + 'ms',
        width: toastWidth
      }, toastStates(placement)[transitionState])
    }, props))
  );
};

// ==============================
// DefaultToast
// ==============================

var DefaultToast = function DefaultToast(_ref5) {
  var _ref5$appearance = _ref5.appearance,
      appearance = _ref5$appearance === undefined ? 'info' : _ref5$appearance,
      autoDismiss = _ref5.autoDismiss,
      autoDismissTimeout = _ref5.autoDismissTimeout,
      children = _ref5.children,
      isRunning = _ref5.isRunning,
      onDismiss = _ref5.onDismiss,
      placement = _ref5.placement,
      transitionDuration = _ref5.transitionDuration,
      transitionState = _ref5.transitionState,
      onMouseEnter = _ref5.onMouseEnter,
      onMouseLeave = _ref5.onMouseLeave,
      otherProps = _objectWithoutProperties(_ref5, ['appearance', 'autoDismiss', 'autoDismissTimeout', 'children', 'isRunning', 'onDismiss', 'placement', 'transitionDuration', 'transitionState', 'onMouseEnter', 'onMouseLeave']);

  return (0, _core.jsx)(
    ToastElement,
    _extends({
      appearance: appearance,
      placement: placement,
      transitionState: transitionState,
      transitionDuration: transitionDuration,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, otherProps),
    (0, _core.jsx)(Icon, {
      appearance: appearance,
      autoDismiss: autoDismiss,
      autoDismissTimeout: autoDismissTimeout,
      isRunning: isRunning
    }),
    (0, _core.jsx)(
      Content,
      null,
      children
    ),
    onDismiss ? (0, _core.jsx)(
      Button,
      { onClick: onDismiss },
      (0, _core.jsx)(_icons.CloseIcon, { className: 'react-toast-notifications__toast__dismiss-icon' }),
      (0, _core.jsx)(
        A11yText,
        { className: 'react-toast-notifications__toast__dismiss-text' },
        'Close'
      )
    ) : null
  );
};

exports.DefaultToast = DefaultToast;
DefaultToast.defaultProps = {
  onDismiss: _utils.NOOP
};