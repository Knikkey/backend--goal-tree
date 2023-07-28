import { Router } from "express";
import { handleLogin } from "../auth/authHandlers";
import {
  getAllMasterGoalsHandler,
  createGoalHandler,
  getGoalTreeHandler,
  patchGoalHandler,
  getGoalByIdHandler,
} from "./dashboardHandlers";

const router = Router();

router.route("/main-goals/:id").get(getAllMasterGoalsHandler);
router.route("/build-tree/:id").get(getGoalTreeHandler);
router.route("/goals/").post(createGoalHandler);
router
  .route("/goals/:id")
  .get(getGoalByIdHandler)
  .patch(patchGoalHandler)
  .post();
router.route("/").get(handleLogin);

export default router;
