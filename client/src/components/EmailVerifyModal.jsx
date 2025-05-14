import React, { useState } from "react";
import {
  useResendEmailVerificationOtpMutation,
  useVerifyEmailOtpMutation,
} from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerifyModal = ({ userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [resendEmailVerificationOtp, { isLoading }] =
    useResendEmailVerificationOtpMutation();

  const [verifyEmailOtp, { isError, isLoading: verifyLoading }] =
    useVerifyEmailOtpMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmailOtp({ email: userEmail, otp: otp.toString() }).unwrap();
      toast.success("✅ Email verified successfully!");
      setOtp("");
      setIsOpen(false);
      navigate(0);
    } catch (err) {
      console.log("Error in email verification", err);
    }
  };
  const handleModal = async () => {
    setIsOpen(true);
    console.log(userEmail);
    try {
      await resendEmailVerificationOtp({ email: userEmail }).unwrap();
      console.log("OTP sent successfully");
    } catch (error) {
      setIsOpen(false);
      console.log("error in resend otp", error);
    }
  };

  if (isLoading)
    return (
      <h2 className="text-green-600 text-xl capitalize cursor-pointer font-semibold border hover:bg-black hover:text-white transition duration-300 px-2 py-1 rounded">
        sending code...
      </h2>
    );

  if (isError) {
    setIsOpen(false);
    return <h2>Something went wrong</h2>;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleModal}
        className="text-xl cursor-pointer font-semibold border hover:bg-black hover:text-white transition duration-300 px-2 py-1 rounded"
      >
        Verify Your Email
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-600 bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-gray-700 rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <div className="mb-4">
              <h2 className="text-2xl font-bold ">🔐 Email Verify OTP</h2>
              <p>Enter the OTP sent to your email</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
              <button
                type="submit"
                // disabled={isLoading}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
              >
                {verifyLoading ? "Verifying..." : "Submit"}
                {/* Submit */}
              </button>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-black hover:text-white transition text-3xl cursor-pointer"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailVerifyModal;
