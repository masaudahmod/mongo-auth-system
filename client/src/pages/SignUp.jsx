import React from "react";
import RegisterForm from "../components/RegisterForm";
import { useSelector } from "react-redux";

const SignUp = () => {
  const { token } = useSelector((state) => state.auth);
  if (token) {
    window.location.href = "/";
  }
  return (
    <div className="bg-slate-800">
      <RegisterForm />
    </div>
  );
};

export default SignUp;
