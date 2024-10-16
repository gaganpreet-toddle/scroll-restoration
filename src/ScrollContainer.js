import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import warning from "warning";

const propTypes = {
  scrollKey: PropTypes.string.isRequired,
  shouldUpdateScroll: PropTypes.func,
  children: PropTypes.element.isRequired,
  elementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]), // New prop
};

const contextTypes = {
  scrollBehavior: PropTypes.object,
};

class ScrollContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.scrollKey = props.scrollKey;
  }

  componentDidMount() {
    const { elementRef, scrollKey } = this.props;
    const element = elementRef
      ? elementRef.current
      : ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

    this.context.scrollBehavior.registerElement(
      scrollKey,
      element,
      this.shouldUpdateScroll
    );

    if (__DEV__) {
      this.domNode = element;
    }
  }

  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.scrollKey === this.props.scrollKey,
      "<ScrollContainer> does not support changing scrollKey."
    );
  }

  componentDidUpdate() {
    if (__DEV__) {
      const { elementRef } = this.props;
      const element = elementRef
        ? elementRef.current
        : ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

      const prevDomNode = this.domNode;
      this.domNode = element;

      warning(
        this.domNode === prevDomNode,
        "<ScrollContainer> does not support changing DOM node."
      );
    }
  }

  componentWillUnmount() {
    this.context.scrollBehavior.unregisterElement(this.scrollKey);
  }

  shouldUpdateScroll = (prevRouterProps, routerProps) => {
    const { shouldUpdateScroll } = this.props;
    if (!shouldUpdateScroll) {
      return true;
    }

    // Hack to allow accessing scrollBehavior._stateStorage.
    return shouldUpdateScroll.call(
      this.context.scrollBehavior.scrollBehavior,
      prevRouterProps,
      routerProps
    );
  };

  render() {
    return this.props.children;
  }
}

ScrollContainer.propTypes = propTypes;
ScrollContainer.contextTypes = contextTypes;

export default ScrollContainer;
