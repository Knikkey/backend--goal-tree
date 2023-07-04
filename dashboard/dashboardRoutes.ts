import { Router } from "express";
import { authCheck, handleLogin } from "./dashboardHandlers";

const router = Router();

router.get("/", authCheck, handleLogin);

export default router;
