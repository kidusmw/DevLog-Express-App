import { Router } from "express";
import {
  getAllChangeLogs,
  createChangeLog,
  deleteChangeLog,
  updateChangeLog,
  gettAllChangeLogsById,
} from "../controllers/changelog";
import { authenticate } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { createChangelogSchema } from "../types/changelog";

const router = Router();

router.get("/", getAllChangeLogs);
router.get("/:id", gettAllChangeLogsById);
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createChangelogSchema),
  createChangeLog,
);
router.patch("/:id", authenticate, authorize("admin"), updateChangeLog);
router.delete("/:id", authenticate, authorize("admin"), deleteChangeLog);

export default router;
