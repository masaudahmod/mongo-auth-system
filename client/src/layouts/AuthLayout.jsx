import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetUserQuery } from "../features/auth/userApi";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { user: dataUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const { data: user, isLoading, isError } = useGetUserQuery();

  if (isLoading) return <Loading />;
  if (!dataUser) {
    return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  }

  if (isError || !user || user === "undefined") {
    return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  }

  return <Outlet />;
};

export default AuthLayout;
