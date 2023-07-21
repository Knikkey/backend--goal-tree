import { Request, Response, NextFunction } from "express";
import {
  createGoal,
  getGoalById,
  getAllMasterGoals,
  getGoalTree,
  patchGoal,
  deleteGoal,
  deleteGoalTree,
} from "../prisma/prismaHanders";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

const createGoalHandler: RequestHandler = async (req, res, next) => {
  const data = await createGoal(req.body);
  res.status(201).send(data);
  next && next();
};
const getGoalByIdHandler: RequestHandler = (req, res, next) => {
  return getGoalById(req.body.gid);
};
const getAllMasterGoalsHandler: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const data = await getAllMasterGoals(id);
  res.status(201).send(data);
  next && next();
};
const getGoalTreeHandler: RequestHandler = (req, res, next) => {
  return getGoalTree(req.body.uid);
};
const patchGoalHandler: RequestHandler = (req, res, next) => {
  patchGoal(req.body);
  next && next();
};
const deleteGoalHandler: RequestHandler = (req, res, next) => {
  deleteGoal(req.body.gid);
};
const deleteGoalTreeHandler: RequestHandler = (req, res, next) => {
  deleteGoalTree(req.body.gid);
};
export { getAllMasterGoalsHandler, createGoalHandler };
