import { Express } from "express";
import express from "express";
import authRoutes from "./auth/authRoutes";
import dashboardRoutes from "./dashboard/dashboardRoutes";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
const cookieSession = require("cookie-session");

//passportSetup must be required here so that it runs
const passportSetup = require("./auth/passport");

// testing only
// import { deleteAllUsers, deleteAllGoals } from "./prisma/prismaHanders";
// deleteAllUsers();
// deleteAllGoals();

const app: Express = express();
dotenv.config({ path: "./.env" });
app.use(
  cors({
    origin: "https://goal-tree-frontend.onrender.com/",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen({ port: 5000, host: "0.0.0.0." }, () => {
  console.log("server is running");
});

export default app;
