import express from "express";
import { createUser, login, logout, resendEmailVerificationOtp, verifyEmailOtp } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/users").post(createUser);
router.route("/users/login").post(login);
router.route("/users/logout").post(auth, logout);
router.route("/users/verify-otp").post(auth, verifyEmailOtp);
router.route("/users/resend-otp").post(auth, resendEmailVerificationOtp);

export default router;
