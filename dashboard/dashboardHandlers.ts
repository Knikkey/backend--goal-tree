import { Request, Response, NextFunction } from "express";
import {
  createGoal,
  getGoalById,
  getAllMasterGoals,
  getGoalTree,
  patchGoal,
  deleteGoal,
} from "../prisma/prismaHandlers";

type RequestHandler = (req: Request, res: Response, next?: NextFunction) => any;

const createGoalHandler: RequestHandler = async (req, res, next) => {
  const data = await createGoal(req.body);
  res.status(201).send(data);
  next && next();
};
const getGoalByIdHandler: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const data = await getGoalById(id);
  res.status(201).send(data);
  next && next();
};
const getAllMasterGoalsHandler: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const data = await getAllMasterGoals(id);
  res.status(201).send(data);
  next && next();
};
const getGoalTreeHandler: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const data = await getGoalTree(id);
  res.status(201).send(data);
  next && next();
};
const patchGoalHandler: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const data = await patchGoal({ ...req.body, gid: id });
  res.status(201).send(data);
  next && next();
};
const deleteGoalHandler: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const data = await deleteGoal(id);
  res.status(201).send(data);
  next && next();
};

export {
  createGoalHandler,
  getGoalByIdHandler,
  getAllMasterGoalsHandler,
  getGoalTreeHandler,
  patchGoalHandler,
  deleteGoalHandler,
};
