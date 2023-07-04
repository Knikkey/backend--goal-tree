import { Router } from "express";
import { authCheck, handleLogin } from "../auth/authHandlers";

const router = Router();

router.get("/", authCheck, handleLogin);

export default router;
