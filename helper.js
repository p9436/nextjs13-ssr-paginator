"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = exports.prismaPaginationHelper = exports.perPageDefault = void 0;
exports.perPageDefault = 10;
function prismaPaginationHelper(currentPage, perPage = exports.perPageDefault) {
    const offset = (currentPage - 1) * perPage;
    return {
        skip: offset,
        take: perPage,
    };
}
exports.prismaPaginationHelper = prismaPaginationHelper;
function paginationHelper(totalRecords, currentPage, perPage = exports.perPageDefault) {
    const totalPages = Math.ceil(totalRecords / perPage);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    return {
        pagination: {
            currentPage,
            nextPage,
            perPage,
            totalRecords,
            totalPages
        }
    };
}
exports.paginationHelper = paginationHelper;
