import { prisma } from "../lib/prisma";
import { ChangelogQuery } from "../types/changelog";

export async function getAllChangelogs({
  page,
  limit,
  search,
}: ChangelogQuery) {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          { title: { contains: search } },
          { version: { contains: search } },
        ],
      }
    : {};

  const [changelogs, total] = await Promise.all([
    prisma.changelog.findMany({
      where,
      skip,
      take: limit,
      include: {
        author: {
          select: { id: true, email: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.changelog.count({ where }),
  ]);

  return {
    data: changelogs,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getAllChangelogById(id: number) {
  const changelog = await prisma.changelog.findUnique({
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
  const existing = await prisma.changelog.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Changelog not found");
  }

  return prisma.changelog.delete({
    where: { id },
  });
}
