import { Express } from "express";
import express from "express";
import authRoutes from "./auth/authRoutes";
import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
const passportSetup = require("./auth/passport");

const app: Express = express();
dotenv.config({ path: "./.env" });

app.use(
  cookieSession({
    name: "session",
    keys: ["placeholder"],
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
// app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: "GET,POST,PATCH,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  console.log("api hit");
  console.log(req);
  res.send("hi");
});

app.listen(5000, () => {
  console.log("server is running");
});
