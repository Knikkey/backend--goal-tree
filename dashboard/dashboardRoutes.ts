import { Router } from "express";
import { handleLogin } from "../auth/authHandlers";
import {
  getAllMasterGoalsHandler,
  createGoalHandler,
  getGoalTreeHandler,
  patchGoalHandler,
} from "./dashboardHandlers";

const router = Router();

router.route("/main-goals/:id").get(getAllMasterGoalsHandler);
router.route("/build-tree/:id").get(getGoalTreeHandler);
router.route("/main-goals/").post(createGoalHandler);
router.route("/goals/:id").patch(patchGoalHandler);
router.route("/").get(handleLogin);

export default router;
