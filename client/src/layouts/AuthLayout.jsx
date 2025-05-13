import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetUserQuery } from "../features/auth/userApi";
import Loading from "../components/Loading";

const AuthLayout = () => {
  const location = useLocation();
  const { data: user, isLoading, isError } = useGetUserQuery();

  // if (token === "undefined" || !token) {
  //   return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  // }

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  }

  return <Outlet />;
};

export default AuthLayout;
