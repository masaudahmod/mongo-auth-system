import mongoose, { model, mongo } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESSTOKEN_SECRET, REFRESHTOKEN_SECRET } from "../constant.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      // required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationOtp: {
      type: String,
    },
    emailVerificationOtpExpires: {
      type: Date,
    },
    passwordResetOtp: {
      type: String,
    },
    passwordResetOtpExpires: {
      type: Date,
    },
    refreshToken: String,
    socialAuth: {
      google: {
        id: String,
        email: String,
        name: String,
      },
      facebook: {
        id: String,
        email: String,
        name: String,
      },
      github: {
        id: String,
        email: String,
        name: String,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("Error in userSchema", error);
    next(error);
  }
});

userSchema.methods.isPasswordMatch = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log("Error in Password Matching! ", error);
  }
};

userSchema.methods.accessTokenGen = function () {
  try {
    return jwt.sign(
      { _id: this._id, email: this.email, name: this.name },
      ACCESSTOKEN_SECRET,
      { expiresIn: "1d" }
    );
  } catch (error) {
    console.log("Error in accessTokenGenerated! ", error);
  }
};

userSchema.methods.refreshTokenGen = function () {
  try {
    return jwt.sign(
      { _id: this._id, email: this.email, name: this.name },
      REFRESHTOKEN_SECRET,
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.log("Error in refreshTokenGenerated! ", error);
  }
};

export const User = mongoose.models.User || model("User", userSchema);
