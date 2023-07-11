import { Request, Response, NextFunction } from "express";
import {
  findGoalById,
  getAllGoals,
  getAllMasterGoals,
  getGoalTree,
  createGoal,
  deleteGoal,
  deleteAllGoals,
  deleteGoalTree,
  addSubGoal,
  patchGoal,
} from "../prisma/prismaHanders";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

const findGoalByIdHandler: RequestHandler = (req, res, next) => {
  return findGoalById(req.body.gid);
};
const getAllGoalsHandler: RequestHandler = (req, res, next) => {
  return getAllGoals(req.body.uid);
};
const getAllMasterGoalsHandler: RequestHandler = (req, res, next) => {
  const { id } = req.params;
  return getAllMasterGoals(id);
};
const getGoalTreeHandler: RequestHandler = (req, res, next) => {
  return getGoalTree(req.body.uid);
};
const postGoalHandler: RequestHandler = (req, res, next) => {
  createGoal(req.body);
};
const patchGoalHandler: RequestHandler = (req, res, next) => {
  patchGoal(req.body);
  next && next();
};
const addSubGoalHandler: RequestHandler = (req, res, next) => {
  addSubGoal(req.body.id, req.body.gid);
};
const deleteGoalHandler: RequestHandler = (req, res, next) => {
  deleteGoal(req.body.gid);
};
const deleteAllGoalsHandler: RequestHandler = (req, res, next) => {
  deleteAllGoals(req.body.uid);
};
const deleteGoalTreeHandler: RequestHandler = (req, res, next) => {
  deleteGoalTree(req.body.gid);
};
export {
  findGoalByIdHandler,
  getAllGoalsHandler,
  getAllMasterGoalsHandler,
  getGoalTreeHandler,
  postGoalHandler,
  patchGoalHandler,
  addSubGoalHandler,
  deleteGoalHandler,
  deleteAllGoalsHandler,
  deleteGoalTreeHandler,
};
