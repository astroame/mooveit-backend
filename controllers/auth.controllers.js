import asyncHandler from "../middlewares/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendTokenResponse from "../utils/sendToken.js";
import User from "../models/UserModel.js";
import sendInBlue from "../utils/sendInBlue.js";

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { email, firstName, lastName, password, role } = req.body;

  if (!firstName || !lastName || !password || !email) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const user = new User({
    email,
    firstName,
    lastName,
    password,
    role,
  });

  await user.save(), sendTokenResponse(user, 201, res);
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate user credentials
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // Get reset token
  const resetToken = await user.getResetPasswordToken(user._id);

  // send the invite
  const resetUrl = `${req.protocol}://${process.env.WEB_URL}/reset-password/${resetToken}`;
  // const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${resetToken}`;

  const message = `
    <html>
    <head>
    <style>
      @media (max-width: 450px) {
        img {
          width: 95%;
        }
      }

      @media (min-width: 769px) {
        .container {
          width: 40%;
        }
      }
    </style>
  </head>
  <body
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(214, 214, 214);
    "
  >
    <div
      class="container"
      style="
        border: 1px solid rgb(222, 222, 222);
        border-radius: 10px;
        background-color: white;
        margin: 50px auto;
        text-align: center;
        padding: 30px 40px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      "
    >

      <p style="text-align: left; margin-top: 15px; color: rgb(83, 83, 83)">
       Hi ${user.firstName}, you are receiving this email because you (or someone else) has requested to reset your password. If this is you, kindly click on the link to continue or just ignore this email if it was not initiated by you
        <br />
        <br />
        Continue resetting your password by clicking on the link below.

        <br />
        <br />
      </p>
      <a
        href="${resetUrl}"
        style="
          background: #26348c;
          padding: 10px 20px;
          border-radius: 15px;
          color: white;
          display: inline-block;
          margin-bottom: 10px;
          text-decoration: none;
        "
      >
        Reset Password
      </a>
    </div>
  </body>
    </html>
   `;

  try {
    await sendInBlue({
      receiverEmail: user.email,
      receiverName: `${user.firstName} ${user.lastName}`,
      message,
      subject: "Password Reset",
    });

    res.status(200).json({
      success: true,
      message: "Reset Token Sent!",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(error);
    return next(new ErrorResponse(`Password reset link could not be sent!`, 500));
  }
});

// @desc    Reset Password
// @route   PATCH /api/v1/auth/forgot-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  // Get hashed token
  // const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: req.params.resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: true });

  sendTokenResponse(user, 200, res);
});

// @desc    Verify reset token
// @route   GET /api/v1/auth/reset-token/:resetToken
// @access  Private
export const verifyResetToken = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse(`Token is invalid`, 401));
  }

  if (user.isExpired()) {
    return next(new ErrorResponse(`Token is expired`, 401));
  }

  res.status(200).json({
    success: true,
    token: user.resetPasswordToken,
  });
});
