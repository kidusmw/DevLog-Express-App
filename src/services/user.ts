import { prisma } from "../lib/prisma";

export async function updateuserRole(
  id: number,
  data: Partial<{ role: string }>,
) {
  const existing = await prisma.user.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("No User Found");
  }

  return prisma.user.update({
    where: { id },
    data,
  });
}
