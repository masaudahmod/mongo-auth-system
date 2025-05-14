import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../features/auth/authApi";
// import { setUser } from "../features/auth/authSlice";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "./Loading";

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      // const res = await registerUser(data).unwrap();
      // const userData = res?.data;
      // dispatch(setUser({ user: userData?.user }));
      navigate("/sign-in");
      toast.success("Registration successful !");
      reset();
    } catch (error) {
      console.error("Error in register", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gray-300 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Register An Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <label htmlFor="name" className={`label ${errors.name ? "text-red-500" : ""}`}>
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className={`inputs ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="absolute right-0 top-0 text-red-500 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className={`label ${errors.email ? "text-red-500" : ""}`}>
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
            {errors.email && (
              <p className="absolute right-0 top-0 font-semibold text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className={`label ${errors.password ? "text-red-500" : ""}`}>
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
              className="inputs pr-10"
            />
            <span
              onClick={togglePassword}
              className="absolute top-[38px] right-3 text-xl text-gray-700 cursor-pointer"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm text-right font-semibold">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-800 cursor-pointer hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
