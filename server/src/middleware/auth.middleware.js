import { verifyTokenAndGetUser } from "../utils/middlewareUtils.js";

export const auth = async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    console.log("No token found");
    return next();
  }
  req.user = await verifyTokenAndGetUser(token);
  next();
};
