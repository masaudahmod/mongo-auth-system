import { User } from "../models/user.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

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
    const isEmailExist = User.findOne({ email });
    if (isEmailExist) {
      throw new ApiError(400, "Email already exist");
    }

    const isNameMatch = User.findOne({ name });
    if (isNameMatch) {
      throw new ApiError(400, "This name is already taken!");
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    return res.json(new ApiSuccess(200, "User created successfully", { user }));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { createUser };
