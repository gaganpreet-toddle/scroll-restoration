/* eslint-disable quotes */
import React from "react";
import { MyRouterPropsContext } from "./ScrollBehaviorContext";

function withRouterPropsContext(WrappedComponent) {
  return function WithRouterPropsContext(props) {
    // Getting Previous and Current Router Props from ScrollBehaviorContext
    const { prevRouterProps, currentRouterProps } =
      React.useContext(MyRouterPropsContext);

    const prevFilters = React.useRef(null);
    const prevOrgId = React.useRef(null);

    const fetchNewDataFunc = (filter, orgId) => {
      const prev = JSON.stringify(prevFilters.current);
      const current = JSON.stringify(filter);

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

      if (
        prevOrgId.current === orgId &&
        prevFilters.current !== null &&
        prev !== current
      ) {
        fetchNew = true;
      }

      if (prevFilters.current === null) {
        console.log("Prev Filters is null");
      } else {
        console.log("Prev Filters Exist : ", prevFilters.current);
      }

      if (prev === current) {
        console.log("Prev and Current are same");
      } else {
        console.log("Prev and Current are different");
        console.log("Prev : ", prev);
        console.log("Current : ", current);
      }

      prevFilters.current = filter;
      prevOrgId.current = orgId;

      console.log("FetchNew Data : ", fetchNew);
      return fetchNew;
    };

    return (
      <WrappedComponent
        {...props}
        prevRouterProps={prevRouterProps}
        currentRouterProps={currentRouterProps}
        fetchNewData={fetchNewDataFunc}
      />
    );
  };
}

export { withRouterPropsContext };
