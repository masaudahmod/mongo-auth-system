import { User } from "../models/user.schema.js";
import { sendEmail } from "../services/mailService.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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
      "Email Verification",
      `Your OTP for email verification is ${otp}. It is valid for 10 minutes.`
    );

    return res.json(new ApiSuccess(200, "User created successfully", { user }));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { createUser };
