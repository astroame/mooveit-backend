import asyncHandler from "../middlewares/async.js";
import sendTokenResponse from "../utils/sendToken.js";
import { AuthService, EmailService } from "../services/index.js";
import { UserModel, AdminModel } from "../models/index.js";

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const query = { ...req.body, next, model: req.originalUrl.includes("admin") ? AdminModel : UserModel };

  const user = await AuthService.register(query);

  const body = req.originalUrl.includes("admin")
    ? `Hi ${user.firstName}, your account has been created. <br /> Your email is ${user.email} <br /> Your password is ${req.body.password}. <br /> Please remember to change your password from the settings page immediately you login in.`
    : `Hi ${user.firstName}, use this OTP ${user.otp} to verify your email address. Note that the OTP would expire after 10 minutes.`;

  // Check if user was an admin or not
  const emailObj = req.originalUrl.includes("admin")
    ? {
        req,
        user,
        body,
        subject: "Account Created",
        errorResponse: "Email link could not be sent!",
      }
    : {
        req,
        user,
        body,
        subject: "Confirm your email",
        // path: "verify",
        // buttonText: "Verify Email Address",
        // method: user.getOtp(user),
        errorResponse: "Email link could not be sent!",
        // userToken: user.verifyToken,
        // userTokenExpire: user.verifyTokenExpire,
      };

  await EmailService.sendEmail(emailObj);

  sendTokenResponse(
    user,
    200,
    res,
    req.originalUrl.includes("admin")
      ? "Account Created Successfully!"
      : "A confirmation mail has been sent to your email address!"
  );
});

// @desc    Resend Verify OTP
// @route   POST /api/v1/auth/resend-verification-token
// @access  Public
export const resendVerificationToken = asyncHandler(async (req, res, next) => {
  const user = await AuthService.resendVerificationToken({
    ...req.body,
    next,
    model: req.originalUrl.includes("admin") ? AdminModel : UserModel,
  });

  const body = `Hi ${user.firstName}, use this OTP ${user.otp} to verify your email address. Note that the OTP would expire after 10 minutes.`;

  const emailObj = {
    req,
    user,
    body,
    subject: "Confirm your email",
    // path: "verify",
    // buttonText: "Verify Email Address",
    // method: user.getOtp(user),
    errorResponse: "Email link could not be sent!",
    // userToken: user.verifyToken,
    // userTokenExpire: user.verifyTokenExpire,
  };
  await EmailService.sendEmail(emailObj);

  sendTokenResponse(user, 200, res, "A confirmation mail has been sent to your email address!");
});

// @desc    Verify Email Address
// @route   GET /api/v1/auth/verify
// @access  Public
export const verifyUserEmail = asyncHandler(async (req, res, next) => {
  const user = await AuthService.verifyUserEmail({
    ...req.body,
    next,
    model: req.originalUrl.includes("admin") ? AdminModel : UserModel,
  });

  sendTokenResponse(user, 200, res, "Your email has been verified successfully");
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const query = { ...req.body, next, model: req.originalUrl.includes("admin") ? AdminModel : UserModel };

  const user = await AuthService.login(query);

  sendTokenResponse(user, 200, res, "Login successful");
});

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await AuthService.forgotPassword({
    ...req.body,
    next,
    model: req.originalUrl.includes("admin") ? AdminModel : UserModel,
  });

  const body = ` Hi ${user.firstName}, you are receiving this email because you (or someone else) has requested to reset your password. If this is you, kindly click on the link to continue or just ignore this email if it was not initiated by you`;

  const emailObj = {
    req,
    user,
    body,
    subject: "Please reset your password",
    path: "reset-password",
    buttonText: "Reset Password",
    method: user.getResetPasswordToken(user._id),
    errorResponse: "Reset password link could not be sent!",
    userToken: user.resetPasswordToken,
    userTokenExpire: user.resetPasswordExpire,
  };

  await EmailService.sendEmail(emailObj);

  res.status(200).json({
    success: true,
    message: "Reset Password Token Sent!",
  });
});

// @desc    Reset Password
// @route   PATCH /api/v1/auth/forgot-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  const query = { ...req.body, ...req.params, next, model: req.originalUrl.includes("admin") ? AdminModel : UserModel };

  const user = await AuthService.resetPassword(query);

  sendTokenResponse(user, 200, res, "Your password has ben reset successfully");
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  let query = { ...req.body, req, next, model: req.originalUrl.includes("admin") ? AdminModel : UserModel };

  await AuthService.updatePassword(query);

  res.status(200).json({
    status: true,
    message: "Password updated successfully",
  });
});

// @desc    Verify reset token
// @route   GET /api/v1/auth/reset-token/:resetToken
// @access  Private
export const verifyResetToken = asyncHandler(async (req, res, next) => {
  const query = { ...req.params, next, model: req.originalUrl.includes("admin") ? AdminModel : UserModel };

  const user = await AuthService.verifyResetToken(query);

  res.status(200).json({
    success: true,
    token: user.resetPasswordToken,
  });
});
