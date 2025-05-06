import mongoose, { model, mongo } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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

export const User =  mongoose.models.User || model("User", userSchema);