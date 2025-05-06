import { ApiError } from "../utils/ApiError.js";

export const errorHandler = async (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      statusCode: err.status || 500,
      status: "error",
      message: err.message || "Server Error occurred",
      data: null,
    });
  }
  return res.status(500).json({
    statusCode: 500,
    status: "error",
    message: err.message,
    data: null,
  });
};
