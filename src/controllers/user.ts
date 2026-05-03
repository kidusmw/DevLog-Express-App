import { Request, Response, NextFunction } from "express";
import { updateuserRole } from "../services/user";
import { AuthRequest } from "../middleware/auth";

export async function updateUserRole(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { role } = req.body;
    const id = parseInt(req.params.id as string);
    const result = await updateuserRole(id, { role });
    res.status(200).json({
      message: "User Role updated",
      result: {
        role,
      },
    });
  } catch (err) {
    next(err);
  }
}
