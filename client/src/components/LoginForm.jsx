import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      const userData = res?.data;
      dispatch(setUser({ user: userData?.user }));
      console.log("Login successful");
      reset();
      toast.success("Login successful!");
      console.log("after toast Login successful");
      navigate(from, { replace: true });
      // window.location.href = from
    } catch (error) {
      console.error("Error in login", error);
      if (error.data?.message === "Invalid credentials") {
        toast.error("Password Incorrect!");
      } else if (error.data?.message) {
        toast.error(error.data.message);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gray-300 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={`label ${errors.email ? "text-red-500" : ""}`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`inputs ${errors.email ? "border-red-500" : ""}`}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className={`label ${errors.password ? "text-red-500" : ""}`}
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`inputs border pr-10 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <span
              onClick={togglePassword}
              className="absolute top-[38px] right-3 text-xl text-gray-700 cursor-pointer"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-900 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
