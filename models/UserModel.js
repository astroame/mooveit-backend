import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
    role: {
      type: String,
      enum: ["super admin", "admin", "customer"],
      default: "customer",
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
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

  // await user.save({ validateBeforeSave: false }, console.log("saved"));
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

UserSchema.methods.isExpired = function () {
  return Date.now() > this.resetPasswordExpire;
};

const User = model("User", UserSchema);

export default User;
