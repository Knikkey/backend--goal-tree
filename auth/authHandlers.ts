import { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from "dotenv";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

dotenv.config({ path: "./.env" });
const handleGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const handleGoogleAuth = passport.authenticate("google", {
  successRedirect: `${process.env.REDIRECT_URL}dashboard`,
});

const handleLogin: RequestHandler = (req, res) => {
  res.send(req.user);
};

const handleLogout: RequestHandler = (req, res, next) => {
  req.logout(next!);
  next && next();
};

export { handleLogin, handleLogout, handleGoogleLogin, handleGoogleAuth };
