import express from "express";
import { createUser, login, logout, resendEmailVerificationOtp, verifyEmailOtp } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/users/signup").post(createUser);
router.route("/users/signin").post(login);
router.route("/users/signout").post(auth, logout);
router.route("/users/verify-otp").post(auth, verifyEmailOtp);
router.route("/users/resend-otp").post(auth, resendEmailVerificationOtp);

export default router;
