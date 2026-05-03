import z from "zod";

const createChangelogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  version: z.string().min(1, "Version is required"),
  description: z.string().min(1, "Description is required"),
});

export type CreateChangelogInput = z.infer<typeof createChangelogSchema>;
