import { Router } from "express";
import { handleLogin } from "../auth/authHandlers";
import { getAllMasterGoalsHandler, postGoalHandler } from "./dashboardHandlers";

const router = Router();

router.route("/main-goals/:id").get(getAllMasterGoalsHandler);
router.route("/main-goals/").post(postGoalHandler);
router.route("/").get(handleLogin);

export default router;
