import asyncHandler from "../middlewares/async.js";
import sendTokenResponse from "../utils/sendToken.js";
import { AdminService, EmailService } from "../services/index.js";

// @desc    Register Admin
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const query = { ...req.body, next };

  const user = await AdminService.register(query);

  const body = `Hi ${user.firstName}, please kindly click on the link to verify your email address. Note that the link would expire after 24 hours.`;

  const emailObj = {
    req,
    user,
    body,
    subject: "Confirm your email",
    path: "verify",
    buttonText: "Verify Email Address",
    method: user.getVerificationToken(user),
    errorResponse: "Email link could not be sent!",
    userToken: user.verifyToken,
    userTokenExpire: user.verifyTokenExpire,
  };

  await EmailService.sendEmail(emailObj);

  sendTokenResponse(user, 200, res, "A confirmation mail has been sent to your email address!");
});

// @desc    Resend Verify Email Address
// @route   POST /api/v1/auth/verify/:token
// @access  Public
export const resendVerificationEmail = asyncHandler(async (req, res, next) => {
  const user = await AdminService.resendVerificationEmail({ ...req.body, next });

  const body = `Hi ${user.firstName}, please kindly click on the link to verify your email address. Note that the link would expire after 24 hours.`;

  const emailObj = {
    req,
    user,
    body,
    subject: "Confirm your email",
    path: "verify",
    buttonText: "Verify Email Address",
    method: user.getVerificationToken(user),
    errorResponse: "Email link could not be sent!",
    userToken: user.verifyToken,
    userTokenExpire: user.verifyTokenExpire,
  };

  await EmailService.sendEmail(emailObj);

  sendTokenResponse(user, 200, res, "A confirmation mail has been sent to your email address!");
});

// @desc    Verify Email Address
// @route   GET /api/v1/auth/verify/:id/:token
// @access  Public
export const verifyEmail = asyncHandler(async (req, res, next) => {
  const user = await AdminService.verifyEmail({ ...req.params, next });

  sendTokenResponse(user, 200, res, "Your email has been verified successfully");
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const query = { ...req.body, next };

  const user = await AdminService.login(query);

  sendTokenResponse(user, 200, res, "Login successful");
});

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await AdminService.forgotPassword({ ...req.body, next });

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
  const query = { ...req.body, ...req.params, next };

  const user = await AdminService.resetPassword(query);

  sendTokenResponse(user, 200, res, "Your password has ben reset successfully");
});

// @desc    Verify reset token
// @route   GET /api/v1/auth/reset-token/:resetToken
// @access  Private
export const verifyResetToken = asyncHandler(async (req, res, next) => {
  const query = { ...req.params, next };

  const user = await AdminService.verifyResetToken(query);

  res.status(200).json({
    success: true,
    token: user.resetPasswordToken,
  });
});

// STORAGE LISTING ENDPOINT
export const approveListing = asyncHandler(async (req, res, next) => {
  const query = { ...req.params, next };

  const storageListing = await AdminService.approveListing(query);

  res.status(200).json({
    success: true,
    data: storageListing,
  });
});

export const viewAllListings = asyncHandler(async (req, res, next) => {
  const storageListing = await AdminService.viewAllListings();

  res.status(200).json({
    success: true,
    count: storageListing.length,
    data: storageListing,
  });
});
