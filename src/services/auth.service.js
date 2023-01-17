import asyncHandler from "../middlewares/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import otpGenerator from "otp-generator";

export const register = asyncHandler(async (query) => {
  const { email, firstName, lastName, password, role, next, model } = query;

  if (!firstName || !lastName || !password || !email) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const isRegistered = await model.findOne({ email });

  if (isRegistered) return next(new ErrorResponse("That email is already registered", 400));

  // Generate OTP and expiration date
  const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  const user = await new model({
    email,
    firstName,
    lastName,
    password,
    role,
    otp,
    verifyOtpExpire: otpExpiry,
  }).save();

  return user;
});

export const login = asyncHandler(async (query) => {
  const { email, password, next, model } = query;

  // Validate user credentials
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await model.findOne({ email }).select("+password");

  if (!user) return next(new ErrorResponse("Invalid Credentials", 401));

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorResponse("Invalid Credentials", 401));

  return user;
});

export const resendVerificationToken = asyncHandler(async ({ email, next, model }) => {
  const user = await model.findOne({ email });

  if (!user) return next(new ErrorResponse("There is no user with that email.", 404));

  if (user.isVerified) return next(new ErrorResponse("Email already verified.", 400));

  await user.getOtp(user);

  return user;
});

export const verifyUserEmail = asyncHandler(async ({ otp, email, next, model }) => {
  let user = await model.findOne({
    email,
  });

  if (!user) return next(new ErrorResponse("There is no user with that email", 400));

  if (user.otp !== otp) return next(new ErrorResponse("OTP is invalid", 400));

  if (user.verifyOtpExpired()) return next(new ErrorResponse("OTP is expired", 401));

  user = await model.findByIdAndUpdate(
    {
      _id: user._id,
    },
    { isVerified: true, otp: null, verifyOtpExpire: null },
    { new: true }
  );

  return user;
});

export const resetPassword = asyncHandler(async (query) => {
  const { password, resetToken, next, model } = query;

  const user = await model.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return next(new ErrorResponse("Invalid token", 400));

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: true });

  return user;
});

export const updatePassword = asyncHandler(async (query) => {
  const { model, req } = query;

  const user = await model.findOne({ _id: req.user }).select("+password");
  query = { ...query, user };
  await user.updatePassword(query);

  return user;
});

export const verifyResetToken = asyncHandler(async (query) => {
  const { resetToken, next, model } = query;

  const user = await model.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return next(new ErrorResponse(`Token is invalid`, 401));

  if (user.isExpired()) return next(new ErrorResponse(`Token is expired`, 401));

  return user;
});

export const forgotPassword = asyncHandler(async ({ email, next, model }) => {
  const user = await model.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  return user;
});
