import { Router } from "express";
import {
  handleLogout,
  handleGoogleLogin,
  handleGoogleAuth,
} from "./authHandlers";

const router = Router();

router.get("/logout", handleLogout);
router.get("/google", handleGoogleLogin);
router.get("/google/callback", handleGoogleAuth);

export default router;
