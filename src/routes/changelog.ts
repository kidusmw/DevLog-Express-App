import { Router } from "express";
import {
  getAllChangeLogs,
  createChangeLog,
  deleteChangeLog,
  updateChangeLog,
  gettAllChangeLogsById,
} from "../controllers/changelog";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", getAllChangeLogs);
router.get("/:id", gettAllChangeLogsById);
router.post("/", authenticate, createChangeLog);
router.patch("/:id", authenticate, updateChangeLog);
router.delete("/:id", authenticate, deleteChangeLog);

export default router;
