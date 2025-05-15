import React, { useState } from "react";
import {
  useResendEmailVerificationOtpMutation,
  useVerifyEmailOtpMutation,
} from "../features/auth/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerifyModal = ({ userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [resendEmailVerificationOtp, { isLoading }] =
    useResendEmailVerificationOtpMutation();

  const [verifyEmailOtp, { isLoading: verifyLoading }] =
    useVerifyEmailOtpMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyEmailOtp({ email: userEmail, otp: otp }).unwrap();
      console.log("error", res);
      if (res?.message) {
        toast(res?.message);
      }
      setIsOpen(false);
      setOtp("");
      navigate(0);
    } catch (err) {
      console.log("Error in email verification", err.data?.message);
      toast(err?.data?.message);
      return;
    }
  };
  const otpSent = async () => {
    try {
      await resendEmailVerificationOtp({ email: userEmail }).unwrap();
      toast("OTP sent successfully");
    } catch (error) {
      console.log("error in resend otp", error);
      toast(error);
    }
  };

  // if (isLoading)
  //   return (
  //     <h2 className="text-green-600 text-xl capitalize cursor-pointer font-semibold border hover:bg-black hover:text-white transition duration-300 px-2 py-1 rounded">
  //       sending code...
  //     </h2>
  //   );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
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
                type=""
                maxLength="6"
                value={otp}
                pattern="[0-9]{6}"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
              >
                {verifyLoading ? "Verifying..." : "Submit"}
                {/* Submit */}
              </button>
              <p className="text-lg text-gray-300">
                Didn’t receive code?{" "}
                <button
                  onClick={otpSent}
                  className="underline text-blue-400 cursor-pointer hover:text-blue-300"
                >
                  {isLoading ? "Sending Code..." : "Resend Code"}
                </button>
              </p>
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
