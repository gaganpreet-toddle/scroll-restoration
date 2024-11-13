"use strict";

exports.__esModule = true;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _warning = require("warning");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  scrollKey: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.element.isRequired,
  elementRef: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.shape({ current: _propTypes2.default.instanceOf(Element) })])
};

var contextTypes = {
  scrollBehavior: _propTypes2.default.object
};

var ScrollContainer = function (_React$Component) {
  _inherits(ScrollContainer, _React$Component);

  function ScrollContainer(props, context) {
    _classCallCheck(this, ScrollContainer);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      if (routerProps.location.action === "POP" || routerProps.location.state.restoreScroll === true) {
        return true;
      }
      return false;
    };

    _this.scrollKey = props.scrollKey;
    return _this;
  }

  ScrollContainer.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        elementRef = _props.elementRef,
        scrollKey = _props.scrollKey;

    var element = elementRef ? elementRef.current : _reactDom2.default.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

    this.context.scrollBehavior.registerElement(scrollKey, element, this.shouldUpdateScroll);

    if (process.env.NODE_ENV !== "production") {
      this.domNode = element;
    }
  };

  ScrollContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(nextProps.scrollKey === this.props.scrollKey, "<ScrollContainer> does not support changing scrollKey.") : void 0;
  };

  ScrollContainer.prototype.componentDidUpdate = function componentDidUpdate() {
    if (process.env.NODE_ENV !== "production") {
      var elementRef = this.props.elementRef;

      var element = elementRef ? elementRef.current : _reactDom2.default.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

      var prevDomNode = this.domNode;
      this.domNode = element;

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(this.domNode === prevDomNode, "<ScrollContainer> does not support changing DOM node.") : void 0;
    }
  };

  ScrollContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.scrollBehavior.unregisterElement(this.scrollKey);
  };

  ScrollContainer.prototype.render = function render() {
    return this.props.children;
  };

  return ScrollContainer;
}(_react2.default.Component);

ScrollContainer.propTypes = propTypes;
ScrollContainer.contextTypes = contextTypes;

exports.default = ScrollContainer;
module.exports = exports.default;