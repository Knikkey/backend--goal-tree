import { Router } from "express";
import { handleLogin } from "../auth/authHandlers";
import {
  getAllMasterGoalsHandler,
  createGoalHandler,
} from "./dashboardHandlers";

const router = Router();

router.route("/main-goals/:id").get(getAllMasterGoalsHandler);
router.route("/main-goals/").post(createGoalHandler);
router.route("/").get(handleLogin);

export default router;
