import { Request, Response, NextFunction } from "express";
import passport from "passport";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

const handleGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const handleGoogleAuth = passport.authenticate("google");

const handleLogin: RequestHandler = (req, res) => {
  res.send(req.user);
};

const handleLogout: RequestHandler = (req, res, next) => {
  req.logout(next!);
  res.redirect("/auth/login");
};

const handleGoogleRedirect: RequestHandler = (req, res) => {
  res.redirect("/dashboard/");
};

const authCheck: RequestHandler = (req, res, next) => {
  if (!req.user) res.redirect("/auth/login");
  else next && next();
};

export {
  handleLogin,
  handleLogout,
  handleGoogleRedirect,
  handleGoogleLogin,
  handleGoogleAuth,
  authCheck,
};
