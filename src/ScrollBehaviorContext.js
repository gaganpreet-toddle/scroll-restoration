/* eslint-disable quotes */
import PropTypes from "prop-types";
import React from "react";

import StateStorage from "./StateStorage";

export const MyRouterPropsContext = React.createContext({
  prevRouterProps: null,
  currentRouterProps: null,
});

const propTypes = {
  shouldUpdateScroll: PropTypes.func,
  createScrollBehavior: PropTypes.func.isRequired,
  routerProps: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

const childContextTypes = {
  scrollBehavior: PropTypes.object.isRequired,
};

class ScrollBehaviorContext extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { routerProps } = props;
    const { router } = routerProps;

    this.state = {
      prevRouterProps: null,
      currentRouterProps: routerProps,
    };

    this.scrollBehavior = props.createScrollBehavior({
      addTransitionHook: router.listenBefore,
      stateStorage: new StateStorage(router),
      getCurrentLocation: () => this.props.routerProps.location,
      shouldUpdateScroll: this.shouldUpdateScroll,
    });

    this.scrollBehavior.updateScroll(null, routerProps);
  }

  getChildContext() {
    return {
      scrollBehavior: this,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Compare nextProps with prevState
    if (
      nextProps.routerProps.location !== prevState.currentRouterProps.location
    ) {
      return {
        prevRouterProps: prevState.currentRouterProps,
        currentRouterProps: nextProps.routerProps,
      };
    }
    return null; // No state update
  }

  componentDidUpdate(prevProps) {
    const { routerProps } = this.props;
    const prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location) {
      return;
    }

    this.scrollBehavior.updateScroll(prevRouterProps, routerProps);
  }

  componentWillUnmount() {
    this.scrollBehavior.stop();
  }

  shouldUpdateScroll = (prevRouterProps, routerProps) => {
    const { shouldUpdateScroll } = this.props;
    if (!shouldUpdateScroll) {
      return true;
    }

    // Hack to allow accessing scrollBehavior._stateStorage.
    return shouldUpdateScroll.call(
      this.scrollBehavior,
      prevRouterProps,
      routerProps,
      false
    );
  };

  registerElement = (key, element, shouldUpdateScroll) => {
    this.scrollBehavior.registerElement(
      key,
      element,
      shouldUpdateScroll,
      this.props.routerProps
    );
  };

  unregisterElement = (key) => {
    this.scrollBehavior.unregisterElement(key);
  };

  render() {
    const { children } = this.props;
    const { prevRouterProps, currentRouterProps } = this.state;
    return (
      <MyRouterPropsContext.Provider
        value={{ prevRouterProps, currentRouterProps }}
      >
        {children}
      </MyRouterPropsContext.Provider>
    );
  }
}

ScrollBehaviorContext.propTypes = propTypes;
ScrollBehaviorContext.childContextTypes = childContextTypes;

export default ScrollBehaviorContext;
