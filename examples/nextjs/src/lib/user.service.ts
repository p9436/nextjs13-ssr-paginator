import { paginationHelper, prismaPaginationHelper } from "../../../../helper"
import { PrismaClient } from "@prisma/client"

const perPage = 5;

export async function getUsers(currentPage: number) {
    const prisma = new PrismaClient();
    const [recordsCount, result] = await prisma.$transaction([
        prisma.user.count({}),
        prisma.user.findMany({
            orderBy: { name: 'asc' },
            ...prismaPaginationHelper(currentPage, perPage)
        }),
    ]);

    return {
        meta: paginationHelper(recordsCount, currentPage, perPage),
        data: result
    }
}