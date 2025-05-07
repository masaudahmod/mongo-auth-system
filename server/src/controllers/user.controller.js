import { User } from "../models/user.schema.js";
import { sendEmail } from "../services/mailService.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
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
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "strict",
    };
    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options);
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
  }
};


export { createUser, login };
