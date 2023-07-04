import { Request, Response, NextFunction } from "express";
import passport from "passport";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

const handleGoogleLogin = passport.authenticate("google", {
  scope: ["profile"],
});

const handleGoogleAuth = passport.authenticate("google", {
  scope: ["profile"],
});

const handleLogin: RequestHandler = (req, res) => {
  res.send("login");
};

const handleLogout: RequestHandler = (req, res) => {
  res.send("logout");
};

const handleGoogleRedirect: RequestHandler = (req, res) => {
  res.send("google redirect");
};

export {
  handleLogin,
  handleLogout,
  handleGoogleRedirect,
  handleGoogleLogin,
  handleGoogleAuth,
};
