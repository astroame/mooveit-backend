import asyncHandler from "../../middlewares/async";
import { Admin, StorageListing } from "../../models";
import ErrorResponse from "../../utils/errorResponse";

// AUTHENTICATION

export const register = asyncHandler(async (query) => {
  const { email, firstName, lastName, password, next } = query;

  if (!firstName || !lastName || !password || !email) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const isRegistered = await Admin.findOne({ email });

  if (isRegistered) return next(new ErrorResponse("That email is already registered", 400));

  const user = await new Admin({
    email,
    firstName,
    lastName,
    password,
  }).save();

  return user;
});

export const login = asyncHandler(async (query) => {
  const { email, password, next } = query;

  // Validate user credentials
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await Admin.findOne({ email }).select("+password");

  if (!user) return next(new ErrorResponse("Invalid Credentials", 401));

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorResponse("Invalid Credentials", 401));

  return user;
});

export const resendVerificationEmail = asyncHandler(async ({ email, next }) => {
  const user = await Admin.findOne({ email });

  if (!user) return next(new ErrorResponse("There is no user with that email.", 404));

  if (user.isVerified) return next(new ErrorResponse("Email already verified.", 400));

  return user;
});

export const verifyEmail = asyncHandler(async ({ token, next }) => {
  let user = await Admin.findOne({
    verifyToken: token,
    verifyTokenExpire: { $gt: Date.now() },
  });
  if (!user) return next(new ErrorResponse("Invalid URL", 400));

  if (user.verifyTokenExpired()) return next(new ErrorResponse(`Token is expired`, 401));

  user = await Admin.findByIdAndUpdate(
    {
      _id: user._id,
    },
    { isVerified: true, verifyToken: null, verifyTokenExpire: null },
    { new: true }
  );

  return user;
});

export const resetPassword = asyncHandler(async (query) => {
  const { password, resetToken, next } = query;

  const user = await Admin.findOne({
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

export const verifyResetToken = asyncHandler(async (query) => {
  const { resetToken, next } = query;

  const user = await Admin.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return next(new ErrorResponse(`Token is invalid`, 401));

  if (user.isExpired()) return next(new ErrorResponse(`Token is expired`, 401));

  return user;
});

export const forgotPassword = asyncHandler(async ({ email, next }) => {
  const user = await Admin.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  return user;
});

// STORAGE LISTING

export const approveListing = asyncHandler(async (query) => {
  const storageListing = await StorageListing.findByIdAndUpdate(query.storageId, { status: "approved" }, { new: true });

  return storageListing;
});

export const viewAllListings = asyncHandler(async () => {
  const storageListing = await StorageListing.find();
  return storageListing;
});
