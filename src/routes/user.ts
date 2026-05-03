import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { updateUserRole } from "../controllers/user";

const router = Router();

router.patch("/:id", authenticate, authorize("admin"), updateUserRole);

export default router;
