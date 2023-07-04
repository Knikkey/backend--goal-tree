import { Request, Response, NextFunction } from "express";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

const authCheck: RequestHandler = (req, res, next) => {
  if (!req.user) res.redirect("/auth/login");
  else next && next();
};

const handleLogin: RequestHandler = (req, res, next) => {
  res.send(req.user);
  console.log(req.user);
};

export { authCheck, handleLogin };
