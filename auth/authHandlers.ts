import { Request, Response, NextFunction } from "express";
import passport from "passport";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

const handleGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const handleGoogleAuth = passport.authenticate("google", {
  successRedirect: "https://goaltreebyknikkey.vercel.app/dashboard",
  //dev
  //successRedirect: "http://localhost:3000/dashboard",
});

const handleLogin: RequestHandler = (req, res) => {
  res.send(req.user);
};

const handleLogout: RequestHandler = (req, res, next) => {
  req.logout(next!);
  next && next();
};

export { handleLogin, handleLogout, handleGoogleLogin, handleGoogleAuth };
