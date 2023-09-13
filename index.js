"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./styles.css");
// Defaults:
const defaultBtnLabelPrevious = "Prev";
const defaultBtnLabelNext = "Next";
const defaultStyleGeneral = "item";
const defaultStyleLeft = "item-left";
const defaultStyleMiddle = "item-mid";
const defaultStyleRight = "item-right";
const defaultStyleDisabled = "item-state-disable";
const defaultStyleCurrent = "item-state-current";
const defaultStyleOther = "item-state-other";
const defaultStyleWrapper = "pagination";
function Paginator(props) {
    const { path, currentPage, totalPages, params = {}, maxVisiblePages = 5, buttonLabelPrevious = defaultBtnLabelPrevious, buttonLabelNext = defaultBtnLabelNext, styleClassWrapper = defaultStyleWrapper, styleClassGeneral = defaultStyleGeneral, styleClassLeft = defaultStyleLeft, styleClassRight = defaultStyleRight, styleClassMiddle = defaultStyleMiddle, styleClassActive = defaultStyleCurrent, styleClassInactive = defaultStyleOther, styleClassDisabled = defaultStyleDisabled, } = props;
    const prevPageNum = currentPage === 1 ? null : currentPage - 1;
    const prevPageLink = prevPageNum
        ? (() => {
            const queryParams = new URLSearchParams(Object.assign(Object.assign({}, params), { page: prevPageNum })).toString();
            return `${path}?${queryParams}`;
        })()
        : null;
    const itemPrev = ((0, jsx_runtime_1.jsx)("li", { children: prevPageLink ? ((0, jsx_runtime_1.jsx)("a", { href: prevPageLink, className: [styleClassGeneral, styleClassLeft, styleClassInactive].join(' '), children: buttonLabelPrevious })) : ((0, jsx_runtime_1.jsx)("span", { className: [styleClassGeneral, styleClassLeft, styleClassDisabled].join(' '), children: buttonLabelPrevious })) }, "prev"));
    const nextPageNum = currentPage === totalPages ? null : currentPage + 1;
    const nextPageLink = nextPageNum
        ? (() => {
            const queryParams = new URLSearchParams(Object.assign(Object.assign({}, params), { page: nextPageNum })).toString();
            return `${path}?${queryParams}`;
        })()
        : null;
    const itemNext = ((0, jsx_runtime_1.jsx)("li", { children: nextPageLink ? ((0, jsx_runtime_1.jsx)("a", { href: nextPageLink, className: [styleClassGeneral, styleClassRight, styleClassInactive].join(' '), children: buttonLabelNext })) : ((0, jsx_runtime_1.jsx)("span", { className: [styleClassGeneral, styleClassRight, styleClassDisabled].join(' '), children: buttonLabelNext })) }, "next"));
    const generatePaginationItems = () => {
        const paginationItems = [];
        paginationItems.push(itemPrev);
        if (totalPages <= maxVisiblePages) {
            // Show all pages
            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                paginationItems.push(renderPaginationLink(pageNum));
            }
        }
        else {
            // Show ellipsis and limited page links
            const leftEllipsis = currentPage > 2;
            const rightEllipsis = totalPages - currentPage > 1;
            let startPage;
            let endPage;
            if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
                startPage = 1;
                endPage = maxVisiblePages;
            }
            else if (currentPage >=
                totalPages - Math.floor(maxVisiblePages / 2)) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - Math.floor(maxVisiblePages / 2);
                endPage = currentPage + Math.floor(maxVisiblePages / 2);
            }
            if (leftEllipsis) {
                paginationItems.push((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("span", { className: [styleClassGeneral, styleClassMiddle, styleClassDisabled].join(' '), children: "..." }) }, "left-ellipsis"));
            }
            for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
                paginationItems.push(renderPaginationLink(pageNum));
            }
            if (rightEllipsis) {
                paginationItems.push((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("span", { className: [styleClassGeneral, styleClassMiddle, styleClassDisabled].join(' '), children: "..." }) }, "right-ellipsis"));
            }
        }
        paginationItems.push(itemNext);
        return paginationItems;
    };
    const renderPaginationLink = (pageNum) => {
        const isActive = pageNum === currentPage;
        const queryParams = new URLSearchParams(Object.assign(Object.assign({}, params), { page: pageNum })).toString();
        const pageLink = pageNum === 1 ? path : `${path}?${queryParams}`;
        return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: pageLink, className: [styleClassGeneral, styleClassMiddle, (isActive ? styleClassActive : styleClassInactive)].join(' '), children: pageNum }) }, pageNum));
    };
    return ((0, jsx_runtime_1.jsx)("ul", { className: styleClassWrapper, children: generatePaginationItems() }));
}
exports.default = Paginator;
