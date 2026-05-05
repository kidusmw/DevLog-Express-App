import { Request, Response, NextFunction } from "express";
import {
  getAllChangelogs,
  getAllChangelogById,
  updateChangelog,
  createChangelog,
  deleteChangelog,
} from "../services/changelog";
import { AuthRequest } from "../middleware/auth";
import { changelogQuerySchema } from "../types/changelog";

export async function getAllChangeLogs(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = changelogQuerySchema.parse(req.query);
    const { data, meta } = await getAllChangelogs(query);
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
}

export async function gettAllChangeLogsById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseInt(req.params.id as string);
    const changelog = await getAllChangelogById(id);
    res.status(200).json({ changelog });
  } catch (err) {
    next(err);
  }
}

export async function createChangeLog(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { title, version, description } = req.body;
    const authorId = req.user?.id!;
    const result = await createChangelog(title, version, description, authorId);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
}

export async function updateChangeLog(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { title, version, description } = req.body;
    const id = parseInt(req.params.id as string);
    const result = await updateChangelog(id, { title, version, description });
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
}

export async function deleteChangeLog(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseInt(req.params.id as string);
    const result = await deleteChangelog(id);
    res.status(200).json({ result, message: "Deleted Successfully" });
  } catch (err) {
    next(err);
  }
}
