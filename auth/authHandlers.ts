import { Request, Response, NextFunction } from "express";
import passport from "passport";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

const handleGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const handleGoogleAuth = passport.authenticate("google");

const handleLogin: RequestHandler = (req, res) => {
  res.send("login");
};

const handleLogout: RequestHandler = (req, res, next) => {
  req.logout(next!);
  res.redirect("/auth/login");
};

const handleGoogleRedirect: RequestHandler = (req, res) => {
  res.redirect("/dashboard/");
};

export {
  handleLogin,
  handleLogout,
  handleGoogleRedirect,
  handleGoogleLogin,
  handleGoogleAuth,
};
