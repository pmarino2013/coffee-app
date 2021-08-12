import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...resto }) => {
  const isAuthenticated = localStorage.getItem("crypto_app_user") || null;

  return (
    <Route
      {...resto}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
