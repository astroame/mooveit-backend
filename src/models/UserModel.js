import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import otpGenerator from "otp-generator";

const UserSchema = Schema(
  {
    firstName: { type: String, required: [true, "Please enter a first name"] },
    lastName: { type: String, required: [true, "Please enter a last name"] },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address",
      ],
    },
    profilePicture: { type: String },
    phone: { type: String },
    enable2fa: { type: Boolean, default: false },
    supportEmail: { type: Boolean, default: false },
    supportText: { type: Boolean, default: false },
    reminderEmail: { type: Boolean, default: false },
    reminderText: { type: Boolean, default: false },
    marketingEmail: { type: Boolean, default: false },
    marketingText: { type: Boolean, default: false },
    isAdminVerified: { type: Boolean, default: false },

    role: {
      type: String,
      enum: ["partner", "customer"],
      default: "customer",
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 6,
      select: false,
      match: [
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i,
        "Password must contain at least 6 characters, 1 uppercase, 1 lowercase and 1 special character",
      ],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,
    otp: String,
    verifyOtpExpire: Date,
    isVerified: String,

    // PROFESSIONAL PARTNER OBJECT
    isVatRegistered: { type: Boolean, default: false },
    vatRegistrationNumber: { type: String },
    companyName: { type: String },
    companyNumber: { type: String },

    // ACCOUNT VERIFICATION
    idType: { type: String },
    firstNameOnId: { type: String },
    lastNameOnId: { type: String },
    verificationDocument: { type: String },

    // ACCOUNT INFORMATION
    accountType: { type: String },
    country: { type: String },
    accountNumber: { type: String },
    sortCode: { type: String },
    address: { type: String },
    city: { type: String },
    dob: { type: Date },
  },
  { timestamps: true }
);

// Encrypt the password using bcrypt
UserSchema.pre("save", async function (req, res, next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare and match the password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash token
UserSchema.methods.getResetPasswordToken = async function (user) {
  // Generate token
  const genResetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  const resetToken = crypto.createHash("sha256").update(genResetToken).digest("hex");

  // Set expire
  const tokenExpiry = Date.now() + 10 * 60 * 1000;

  await User.findOneAndUpdate(
    { _id: user },
    {
      resetPasswordToken: resetToken,
      resetPasswordExpire: tokenExpiry,
    },
    { new: true }
  );

  return resetToken;
};

// Generate and hash token for email verification
UserSchema.methods.getVerificationToken = async function (user) {
  // Generate token
  const genVerificationToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  const verificationToken = crypto.createHash("sha256").update(genVerificationToken).digest("hex");

  // Set expire
  const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

  await User.findOneAndUpdate(
    { _id: user },
    {
      verifyToken: verificationToken,
      verifyTokenExpire: tokenExpiry,
    },
    { new: true }
  );

  return verificationToken;
};

// Generate otp for email verification
UserSchema.methods.getOtp = async function (user) {
  // Generate token
  const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

  // Set expire
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  await User.findOneAndUpdate(
    { _id: user },
    {
      otp,
      verifyOtpExpire: otpExpiry,
    },
    { new: true }
  );

  return otp;
};

UserSchema.methods.isExpired = function () {
  return Date.now() > this.resetPasswordExpire;
};

UserSchema.methods.verifyTokenExpired = function () {
  return Date.now() > this.verifyTokenExpire;
};

UserSchema.methods.verifyOtpExpired = function () {
  return Date.now() > this.verifyOtpExpire;
};

// Update Password
UserSchema.methods.updatePassword = async function (query) {
  let { oldPassword, newPassword, confirmPassword, next, user } = query;

  console.log("old password");

  // Check if password matches
  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch)
    return next(new ErrorResponse("The old password you provided does not match the password in our database", 400));

  if (newPassword !== confirmPassword)
    return next(new ErrorResponse("Your new password and confirm password does not match", 400));

  // Validate Password
  const regex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i);
  if (!newPassword.match(regex))
    return next(
      new ErrorResponse(
        "Password must contain at least 6 characters, 1 uppercase, 1 lowercase and 1 special character",
        400
      )
    );

  // Hash and salt the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(newPassword, salt);

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      password,
    },
    { runValidators: true }
  );

  return user;
};

const User = model("User", UserSchema);

export default User;
