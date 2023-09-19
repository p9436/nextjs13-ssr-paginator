export declare const perPageDefault = 10;
export interface PaginationProps {
    pagination: {
        totalRecords: number;
        totalPages: number;
        perPage: number;
        currentPage: number;
        nextPage: number | null;
    };
}
export declare function prismaPaginationHelper(currentPage: number, perPage?: number): {
    skip: number;
    take: number;
};
export declare function paginationHelper(totalRecords: number, currentPage: number, perPage?: number): PaginationProps;
