import { Request, Response, NextFunction } from "express";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

const postGoal: RequestHandler = (req, res, next) => {};
const patchGoal: RequestHandler = (req, res, next) => {};
const deleteGoal: RequestHandler = (req, res, next) => {};
const deleteAllGoals: RequestHandler = (req, res, next) => {};
const getGoal: RequestHandler = (req, res, next) => {};
const getAllGoals: RequestHandler = (req, res, next) => {};

export {
  postGoal,
  patchGoal,
  deleteGoal,
  deleteAllGoals,
  getGoal,
  getAllGoals,
};
