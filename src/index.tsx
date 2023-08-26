import Link from "next/link";

// Defaults:
// style General
const defaultStyleClassG = "flex items-center justify-center px-4 h-10 border";
const defaultStyleClassL = "rounded-l-lg";
const defaultStyleClassR = "rounded-r-lg";
// style Active
const defaultStyleClassA = "text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-700";
// style Inactive
const defaultStyleClassN = "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 ";
// style Disabled
const defaultStyleClassD = "text-gray-400 bg-gray-50";
// style Wrapper
const defaultStyleClassW = "inline-flex -space-x-px text-base h-10";
//Prev and next buttons
const defaultBtnLabelPrevious = "Previous";
const defaultBtnLabelNext = "Next";

interface Props {
    path: string;
    currentPage: number;
    totalPages: number;
    maxVisiblePages?: number;
    buttonLabelPrevious?: string;
    buttonLabelNext?: string;
    styleClassGeneral?: string;
    styleClassLeft?: string;
    styleClassRight?: string;
    styleClassActive?: string;
    styleClassInactive?: string;
    styleClassDisabled?: string;
}

export default function Paginator(props: Props) {
    const {
        path,
        currentPage,
        totalPages,
        maxVisiblePages = 5,
        buttonLabelPrevious = defaultBtnLabelPrevious,
        buttonLabelNext = defaultBtnLabelNext,
        styleClassGeneral = defaultStyleClassG,
        styleClassLeft = defaultStyleClassL,
        styleClassRight = defaultStyleClassR,
        styleClassActive = defaultStyleClassA,
        styleClassInactive = defaultStyleClassN,
        styleClassDisabled = defaultStyleClassD,
    } = props;

    const prevPageNum = currentPage === 1 ? null : currentPage - 1;
    const prevPageLink = prevPageNum ? `${path}?page=${prevPageNum}` : null;
    const itemPrev = (
        <li key="prev">
            {prevPageLink ? (
                <Link
                    href={prevPageLink}
                    className={`${styleClassGeneral} ${styleClassLeft} ${styleClassInactive}`}
                >
                    {buttonLabelPrevious}
                </Link>
            ) : (
                <span
                    className={`${styleClassGeneral} ${styleClassLeft} ${styleClassDisabled}`}
                >
                    {buttonLabelPrevious}
                </span>
            )}
        </li>
    );

    const nextPageNum = currentPage === totalPages ? null : currentPage + 1;
    const nextPageLink = nextPageNum ? `${path}?page=${nextPageNum}` : null;
    const itemNext = (
        <li key="prev">
            {nextPageLink ? (
                <Link
                    href={nextPageLink}
                    className={`${styleClassGeneral} ${styleClassRight} {styleClassInactive}`}
                >
                    {buttonLabelNext}
                </Link>
            ) : (
                <span
                    className={`${styleClassGeneral} ${styleClassRight} ${styleClassDisabled}`}
                >
                    {buttonLabelNext}
                </span>
            )}
        </li>
    );

    const generatePaginationItems = () => {
        const paginationItems = [];
        paginationItems.push(itemPrev);

        if (totalPages <= maxVisiblePages) {
            // Show all pages
            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                paginationItems.push(renderPaginationLink(pageNum));
            }
        } else {
            // Show ellipsis and limited page links
            const leftEllipsis = currentPage > 2;
            const rightEllipsis = totalPages - currentPage > 1;

            let startPage;
            let endPage;

            if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (
                currentPage >=
                totalPages - Math.floor(maxVisiblePages / 2)
            ) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.floor(maxVisiblePages / 2);
                endPage = currentPage + Math.floor(maxVisiblePages / 2);
            }

            if (leftEllipsis) {
                paginationItems.push(
                    <li key="left-ellipsis">
                        <span
                            className={`${styleClassGeneral} ${styleClassDisabled}`}
                        >
                            ...
                        </span>
                    </li>,
                );
            }

            for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
                paginationItems.push(renderPaginationLink(pageNum));
            }

            if (rightEllipsis) {
                paginationItems.push(
                    <li key="right-ellipsis">
                        <span
                            className={`${styleClassGeneral} ${styleClassDisabled}`}
                        >
                            ...
                        </span>
                    </li>,
                );
            }
        }

        paginationItems.push(itemNext);

        return paginationItems;
    };

    const renderPaginationLink = (pageNum: number) => {
        const isActive = pageNum === currentPage;
        const pageLink = pageNum === 1 ? path : `${path}?page=${pageNum}`;

        return (
            <li key={pageNum}>
                <Link
                    href={pageLink}
                    className={`${styleClassGeneral}  ${
                        isActive ? styleClassActive : styleClassInactive
                    }`}
                >
                    {pageNum}
                </Link>
            </li>
        );
    };

    return (
        <ul className={defaultStyleClassW}>
            {generatePaginationItems()}
        </ul>
    );
}
