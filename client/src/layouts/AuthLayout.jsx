import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  if (token === "undefined" || !token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  }

  return <Outlet />;
};

export default AuthLayout;
