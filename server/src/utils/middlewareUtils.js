import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";
import { ACCESSTOKEN_SECRET } from "../constant.js";
import { User } from "../models/user.schema.js";

export const verifyTokenAndGetUser = async (token) => {
  if (!token) {
    throw new ApiError(401, "🔒 Unauthorized Access - Token not provided");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, ACCESSTOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "🔒Unauthorized Access - Invalid or Expired Token");
  }
  
  if (!decodedToken || !decodedToken._id) {
    throw new ApiError(401, "⚠️ Unauthorized Access - Invalid token payload");
  }

  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(404, "Unauthorized Access - 🕵️‍♂️ User not found");
  }

  return user;
};
