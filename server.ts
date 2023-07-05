import { Express } from "express";
import express from "express";
import authRoutes from "./auth/authRoutes";
import dashboardRoutes from "./dashboard/dashboardRoutes";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
const cookieSession = require("cookie-session");
const passportSetup = require("./auth/passport");
//for testing only
import { deleteAllUsers } from "./prisma/prismaHanders";

const app: Express = express();
dotenv.config({ path: "./.env" });

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: "GET,POST,PATCH,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(5000, () => {
  console.log("server is running");
});

//for testing only
deleteAllUsers();

export default app;
