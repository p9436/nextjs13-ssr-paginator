// TODO: Add descriptions to README


export const perPage = 10

export interface PaginationProps {
    pagination: {
        totalRecords: number
        totalPages: number
        perPage: number
        currentPage: number
        nextPage: number | null
    }
}

export function prismaPaginationHelper(currentPage: number) {
    const offset = (currentPage - 1) * perPage

    return {
        skip: offset,
        take: perPage,
    }
}

export function paginationHelper(totalRecords: number, currentPage: number, perPage: number): PaginationProps {
    const totalPages = Math.ceil(totalRecords / perPage);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null
    return {
        pagination: {
            currentPage,
            nextPage,
            perPage,
            totalRecords,
            totalPages
        }
    }
}
