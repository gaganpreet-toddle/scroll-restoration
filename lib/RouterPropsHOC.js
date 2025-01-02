"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable quotes */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ScrollBehaviorContext = require("./ScrollBehaviorContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withRouterPropsContext(WrappedComponent) {
  return function WithRouterPropsContext(props) {
    // Getting Previous and Current Router Props from ScrollBehaviorContext
    var _React$useContext = _react2.default.useContext(_ScrollBehaviorContext.MyRouterPropsContext),
        prevRouterProps = _React$useContext.prevRouterProps,
        currentRouterProps = _React$useContext.currentRouterProps;

    var isPopAction = currentRouterProps.location.action === "POP";
    var isRestoreScroll = currentRouterProps.location.state.restoreScroll === true;

    // Logic to fetch new data or not
    var fetchNew = true;
    if (isPopAction) {
      if (prevRouterProps === null) {
        fetchNew = true; // Reload happened !
      } else {
        fetchNew = false;
      }
    } else if (isRestoreScroll) {
      fetchNew = false;
    }

    return _react2.default.createElement(WrappedComponent, _extends({}, props, {
      prevRouterProps: prevRouterProps,
      currentRouterProps: currentRouterProps,
      fetchNewData: fetchNew
    }));
  };
}

exports.default = withRouterPropsContext;
module.exports = exports.default;