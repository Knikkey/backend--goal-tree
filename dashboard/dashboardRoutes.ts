import { Router } from "express";
import { handleLogin } from "../auth/authHandlers";
import { getAllMasterGoalsHandler } from "./dashboardHandlers";

const router = Router();

router.get("/", handleLogin);
router.get("/main-goals/:id", getAllMasterGoalsHandler);

export default router;
