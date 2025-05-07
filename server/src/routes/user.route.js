import express from "express";
import { createUser, login } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/users").post(createUser);
router.route("/users/login").post(login);

export default router;
