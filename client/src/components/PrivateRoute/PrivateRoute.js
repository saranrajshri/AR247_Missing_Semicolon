import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";
/**
 * A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  let location = useLocation();
  // Check if token exists and its expiry.
  const checkAuthentication = (name) => {
    let portal = name.split("/")[1].toLowerCase();
    let tokenOwner = "";
    if (portal === "farmer") {
      tokenOwner = "CUSTOMER_AUTH_TOKEN";
    } else if (portal === "driver") {
      tokenOwner = "DRIVER_AUTH_TOKEN";
    }
    let token = localStorage.getItem(tokenOwner);
    if (token !== null) {
      let decoded = jwt.decode(token);
      let currentTime = Date.now() / 1000;
      if (decoded.exp <= currentTime) {
        return false;
      }
      return true;
    }
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuthentication(props.location.pathname) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/${props.location.pathname.split("/")[1]}/login`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
