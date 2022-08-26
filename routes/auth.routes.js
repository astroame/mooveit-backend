import express from "express";
import { register, login, forgotPassword, resetPassword, verifyResetToken } from "../controllers/auth.controllers.js";

const router = express.Router();

// import { protect, authorize } from "../middlewares/auth.js";

router.route("/register").post(register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.route("/reset-password/:resetToken").patch(resetPassword).get(verifyResetToken);

export default router;
