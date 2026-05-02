import { Router } from "express";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
  });
});

router.get("/protected", authenticate, (req: AuthRequest, res) => {
  res.json({
    message: `Hello ${req.user?.email}`,
  });
});

export default router;
