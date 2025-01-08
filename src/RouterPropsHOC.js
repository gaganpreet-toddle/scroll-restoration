/* eslint-disable quotes */
import React from "react";
import { MyRouterPropsContext } from "./ScrollBehaviorContext";

function withRouterPropsContext(WrappedComponent) {
  return function WithRouterPropsContext(props) {
    // Getting Previous and Current Router Props from ScrollBehaviorContext
    const { prevRouterProps, currentRouterProps } =
      React.useContext(MyRouterPropsContext);

    const isPopAction = currentRouterProps.location.action === "POP";
    const isRestoreScroll =
      currentRouterProps.location.state &&
      currentRouterProps.location.state.restoreScroll === true;

    // Logic to fetch new data or not
    let fetchNew = true;
    if (isPopAction) {
      if (prevRouterProps === null) {
        fetchNew = true; // Reload happened !
      } else {
        fetchNew = false;
      }
    } else if (isRestoreScroll) {
      fetchNew = false;
    }

    return (
      <WrappedComponent
        {...props}
        prevRouterProps={prevRouterProps}
        currentRouterProps={currentRouterProps}
        fetchNewData={fetchNew}
      />
    );
  };
}

export default withRouterPropsContext;
