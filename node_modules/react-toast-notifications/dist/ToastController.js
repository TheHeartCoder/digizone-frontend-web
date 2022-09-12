'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastController = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = require('react-transition-group');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultAutoDismissTimeout = 5000;

var TimerType = {
  clear: _utils.NOOP,
  pause: _utils.NOOP,
  resume: _utils.NOOP
};

function Timer(callback, delay) {
  var timerId = void 0;
  var start = delay;
  var remaining = delay;

  this.clear = function () {
    clearTimeout(timerId);
  };

  this.pause = function () {
    clearTimeout(timerId);
    remaining -= Date.now() - start;
  };

  this.resume = function () {
    start = Date.now();
    clearTimeout(timerId);
    timerId = setTimeout(callback, remaining);
  };

  this.resume();
}

var ToastController = exports.ToastController = function (_Component) {
  _inherits(ToastController, _Component);

  function ToastController() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToastController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToastController.__proto__ || Object.getPrototypeOf(ToastController)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isRunning: Boolean(_this.props.autoDismiss)
    }, _this.startTimer = function () {
      var _this$props = _this.props,
          autoDismiss = _this$props.autoDismiss,
          autoDismissTimeout = _this$props.autoDismissTimeout,
          onDismiss = _this$props.onDismiss;


      if (!autoDismiss) return;

      _this.setState({ isRunning: true });
      _this.timeout = new Timer(onDismiss, autoDismissTimeout);
    }, _this.clearTimer = function () {
      if (_this.timeout) _this.timeout.clear();
    }, _this.onMouseEnter = function () {
      _this.setState({ isRunning: false }, function () {
        if (_this.timeout) _this.timeout.pause();
      });
    }, _this.onMouseLeave = function () {
      _this.setState({ isRunning: true }, function () {
        if (_this.timeout) _this.timeout.resume();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToastController, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startTimer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.autoDismiss !== this.props.autoDismiss) {
        var startOrClear = this.props.autoDismiss ? this.startTimer : this.clearTimer;

        startOrClear();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearTimer();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          autoDismiss = _props.autoDismiss,
          autoDismissTimeout = _props.autoDismissTimeout,
          Toast = _props.component,
          props = _objectWithoutProperties(_props, ['autoDismiss', 'autoDismissTimeout', 'component']);

      var isRunning = this.state.isRunning;

      // NOTE: conditions here so methods can be clean

      var handleMouseEnter = autoDismiss ? this.onMouseEnter : _utils.NOOP;
      var handleMouseLeave = autoDismiss ? this.onMouseLeave : _utils.NOOP;

      return _react2.default.createElement(Toast, _extends({
        autoDismiss: autoDismiss,
        autoDismissTimeout: autoDismissTimeout,
        isRunning: isRunning,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      }, props));
    }
  }]);

  return ToastController;
}(_react.Component);

ToastController.defaultProps = {
  autoDismiss: false
};