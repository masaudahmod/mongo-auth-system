import React from "react";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    window.location.href = "/";
  }
  return (
    <div className="bg-slate-700">
      <LoginForm />
    </div>
  );
};

export default Login;
