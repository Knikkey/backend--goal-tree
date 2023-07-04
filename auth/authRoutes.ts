import { Router } from "express";
import {
  handleLogout,
  handleLogin,
  handleGoogleRedirect,
  handleGoogleLogin,
  handleGoogleAuth,
} from "./authHandlers";

const router = Router();

router.get("/logout", handleLogout);
router.get("/login", handleLogin);
router.get("/google", handleGoogleLogin);
router.get("/google/callback", handleGoogleAuth, handleGoogleRedirect);

export default router;
