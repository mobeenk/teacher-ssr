export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
//  T is an array of memebers
export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}