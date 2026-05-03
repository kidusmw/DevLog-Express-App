import { prisma } from "../lib/prisma";

export async function getAllChangelogs() {
  return prisma.changelog.findMany({
    include: {
      author: {
        select: { id: true, email: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllChangelogById(id: number) {
  const changelog = prisma.changelog.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, email: true },
      },
    },
  });

  if (!changelog) {
    throw new Error("Changelog not found");
  }

  return changelog;
}

export async function createChangelog(
  title: string,
  version: string,
  description: string,
  authorId: number,
) {
  return prisma.changelog.create({
    data: {
      title,
      version,
      description,
      author: {
        connect: { id: authorId },
      },
    },
  });
}

export async function updateChangelog(
  id: number,
  data: Partial<{ title: string; version: string; description: string }>,
) {
  return prisma.changelog.update({
    where: { id },
    data,
  });
}

export async function deleteChangelog(id: number) {
  return prisma.changelog.delete({
    where: { id },
  });
}
