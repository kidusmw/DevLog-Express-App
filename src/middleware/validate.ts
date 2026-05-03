import { NextFunction, Request, Response } from "express";
import z from "zod";

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (result.error) {
      return res.status(400).json({
        error: result.error.issues,
      });
    }
    next();
  };
}
