import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(
  cors({
    //origin: "http://localhost:5173",
    //origin: "https://adpm-tasks.netlify.app/",
    origin: [
      "http://localhost:5173",
      "https://adpm-tasks.netlify.app",
      "https://main--adpm-tasks.netlify.app",
      "https://651548357809a40008935662--adpm-tasks.netlify.app",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", tasksRoutes);
app.use("/api", authRoutes);

export default app;
