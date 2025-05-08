import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !user) {
      navigate("/sign-in");
    } else {
      navigate("/");
    }
  }, [user, token, navigate]);

  return <Outlet />;
};

export default AuthLayout;
