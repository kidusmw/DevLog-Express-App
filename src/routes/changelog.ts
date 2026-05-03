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

const router = Router();

router.get("/", getAllChangeLogs);
router.get("/:id", gettAllChangeLogsById);
router.post("/", authenticate, authorize("admin"), createChangeLog);
router.patch("/:id", authenticate, authorize("admin"), updateChangeLog);
router.delete("/:id", authenticate, authorize("admin"), deleteChangeLog);

export default router;
