import { verifyTokenAndGetUser } from "../utils/middlewareUtils.js";

export const auth = async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  req.user = await verifyTokenAndGetUser(token);
  next();
};
