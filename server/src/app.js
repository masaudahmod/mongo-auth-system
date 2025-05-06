import express from "express";
import cors from "cors";
import { ORIGIN } from "./constant.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRoutes from "./routes/user.route.js";

app.use("/api/v1", userRoutes);

app.get("/", (_, res) => {
  return res.json(
    "Hello from the server! Your request is like a clean commit—it's been received, and we're already processing it. Sit tight, and we'll get back to you faster than a hot reload!"
  );
});

export { app };
