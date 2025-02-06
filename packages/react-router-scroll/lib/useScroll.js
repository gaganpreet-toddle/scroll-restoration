'use strict';

exports.__esModule = true;
exports.default = useScroll;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scrollBehavior = require('scroll-behavior');

var _scrollBehavior2 = _interopRequireDefault(_scrollBehavior);

var _ScrollBehaviorContext = require('./ScrollBehaviorContext');

var _ScrollBehaviorContext2 = _interopRequireDefault(_ScrollBehaviorContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultCreateScrollBehavior(config) {
  return new _scrollBehavior2.default(config);
}

function useScroll(shouldUpdateScrollOrConfig) {
  var shouldUpdateScroll = void 0;
  var createScrollBehavior = void 0;

  if (!shouldUpdateScrollOrConfig || typeof shouldUpdateScrollOrConfig === 'function') {
    shouldUpdateScroll = shouldUpdateScrollOrConfig;
    createScrollBehavior = defaultCreateScrollBehavior;
  } else {
    shouldUpdateScroll = shouldUpdateScrollOrConfig.shouldUpdateScroll;
    var _shouldUpdateScrollOr = shouldUpdateScrollOrConfig.createScrollBehavior;
    createScrollBehavior = _shouldUpdateScrollOr === undefined ? defaultCreateScrollBehavior : _shouldUpdateScrollOr;
  }

  return {
    renderRouterContext: function renderRouterContext(child, props) {
      return _react2.default.createElement(
        _ScrollBehaviorContext2.default,
        {
          shouldUpdateScroll: shouldUpdateScroll,
          createScrollBehavior: createScrollBehavior,
          routerProps: props
        },
        child
      );
    }
  };
}
module.exports = exports.default;