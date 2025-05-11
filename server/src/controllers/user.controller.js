import { User } from "../models/user.schema.js";
import { sendEmail } from "../services/mailService.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getUser = async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      throw new ApiError(400, "Email isn't provided");
    }
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.json(new ApiSuccess(200, "User found", { user }));
  } catch (error) {
    console.log("Error in getUser", error);
  }
};

const generateTokens = async (_id) => {
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = await user.accessTokenGen();
    const refreshToken = await user.refreshTokenGen();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error in generateTokens", error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email) {
      throw new ApiError(400, "Email isn't provided");
    }
    if (!password) {
      throw new ApiError(400, "Password isn't provided");
    }
    if (password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters long");
    }

    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist) {
      throw new ApiError(400, "Email already exist");
    }

    const isNameMatch = await User.findOne({ name });
    if (isNameMatch) {
      throw new ApiError(400, "This name is already taken!");
    }

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password,
      emailVerificationOtp: otp,
      emailVerificationOtpExpires: otpExpires,
    });

    await sendEmail(
      email,
      "Mail Verification",
      `Your OTP for email verification is ${otp}. It is valid for 10 minutes.`
    );

    return res.json(new ApiSuccess(201, "User created successfully", { user }));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordMatch = await user.isPasswordMatch(password);
    if (!isPasswordMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);
    const options = {
      httpOnly: true,
      secure: true,
      maxage: 24 * 60 * 60 * 1000,
      // expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };

    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options);

    console.log(`user: ${user?.name} is logged in`);
    if (!user.isEmailVerified) {
      return res.json(
        new ApiSuccess(200, "User logged in successfully", {
          user: user,
          accessToken,
        })
      );
    }
    return res.json(
      new ApiSuccess(200, "User logged in successfully", {
        user: user,
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    console.log("Error in login", error);
    throw new ApiError(500, `Login Error: ${error.message}`);
  }
};

const logout = async (req, res) => {
  try {
    await User.findOneAndUpdate(req.user?._id, {
      $set: {
        refreshToken: null,
      },
    });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    console.log(`user: ${req.user?.name} is logged out`);
    return res.json(new ApiSuccess(200, "User logged out successfully", {}));
  } catch (error) {
    console.log("Error in logout", error);
  }
};

const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw new ApiError(400, "Email and OTP fields are required");
    }

    const user = await User.findOne({ email }).select(
      "+emailVerificationOtp +emailVerificationOtpExpires"
    );
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.emailVerificationOtp !== otp) {
      throw new ApiError(400, "Invalid OTP");
    }
    if (!user.emailVerificationOtp || !user.emailVerificationOtpExpires) {
      throw new ApiError(400, "OTP not found! Request a new OTP");
    }

    if (user.emailVerificationOtpExpires < Date.now()) {
      throw new ApiError(400, "This OTP has expired! Request a new OTP");
    }

    const updatedUser = await User.findOneAndUpdate(
      user._id,
      {
        $set: {
          isEmailVerified: true,
          emailVerificationOtp: undefined,
          emailVerificationOtpExpires: undefined,
        },
      },
      { new: true }
    );

    await sendEmail(
      email,
      "Mail Verification",
      `${updatedUser?.name}, Your email has been verified successfully.`
    );

    return res.json(
      new ApiSuccess(200, "Email verified successfully", { user: updatedUser })
    );
  } catch (error) {
    console.log("Error in verifyEmailOtp", error);
    throw new ApiError(500, `verifyEmailOtp Error: ${error.message}`, error);
  }
};

const resendEmailVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(400, "Email field is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user?.isEmailVerified) {
      return res.json(new ApiSuccess(203, "Email already verified", {}));
    }

    if (
      user.emailVerificationOtp &&
      user.emailVerificationOtpExpires > Date.now()
    ) {
      throw new ApiError(400, "Email verification OTP already sent");
    }

    const otp = generateOtp();
    const updatedUser = await User.findOneAndUpdate(
      user._id,
      {
        $set: {
          emailVerificationOtp: otp,
          emailVerificationOtpExpires: Date.now() + 10 * 60 * 1000,
        },
      },
      { new: true }
    );
    await sendEmail(
      email,
      "Mail Verification",
      `${updatedUser?.name}, Your OTP for email verification is ${otp}. It is valid for 10 minutes.`
    );

    return res.json(
      new ApiSuccess(200, "Email verification OTP sent successfully", {
        user: updatedUser,
      })
    );
  } catch (error) {
    console.log("Error in resendEmailVerificationOtp", error);
    throw new ApiError(
      500,
      `resendEmailVerificationOtp Error: ${error.message}`,
      error
    );
  }
};

export {
  getUser,
  createUser,
  login,
  logout,
  verifyEmailOtp,
  resendEmailVerificationOtp,
};
