import z from "zod";

export const createChangelogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  version: z.string().min(1, "Version is required"),
  description: z.string().min(1, "Description is required"),
});

export const changelogQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
});

export type CreateChangelogInput = z.infer<typeof createChangelogSchema>;
export type ChangelogQuery = z.infer<typeof changelogQuerySchema>;
