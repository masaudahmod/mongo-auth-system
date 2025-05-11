import express from "express";
import cors from "cors";
import { ORIGIN } from "./constant.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ORIGIN, credentials: true }));

import userRoutes from "./routes/user.route.js";
import { errorHandler } from "./middleware/errorHandler.js";

app.use("/api/v1", userRoutes);

app.get("/", (_, res) => {
  return res.json(
    "Hello from the server! Your request is like a clean commit—it's been received, and we're already processing it. Sit tight, and we'll get back to you faster than a hot reload!"
  );
});

app.use(errorHandler);

export { app };
