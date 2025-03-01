import produce, { Draft } from 'immer';
import { Reducer } from 'react';
import { extractPageFromQueryString, setSearchParams } from 'utils/browser-utils';

// #region State
export type PaginationState = {
    page?: number;
    pageCount?: number;
    pageSize?: number;
    totalCount?: number;
};

export const INITIAL_PAGINATION_STATE: PaginationState = {
    page: undefined,
    pageCount: undefined,
    pageSize: 20,
    totalCount: undefined,
};

// #endregion
const setPage = (draft: Draft<PaginationState>, action: SetPageAction) => {
    draft.page = action.page;
    setSearchParams({ page: action.page });
};
const setPageSize = (draft: Draft<PaginationState>, action: SetPageSizeAction) => {
    draft.pageSize = action.pageSize;
    setSearchParams({ pageSize: action.pageSize });
};
const initPage = (draft: Draft<PaginationState>): void => {
    const page = extractPageFromQueryString();
    draft.page = page;
};

// #region Sync Actions
type SetPageAction = { type: 'SET_PAGE'; page: number };
type InitPageAction = { type: 'INIT_PAGE' };
type SetPageCountAction = { type: 'SET_PAGE_COUNT'; pageCount: number };
type SetPageSizeAction = { type: 'SET_PAGE_SIZE'; pageSize: number };
type SetTotalCountAction = { type: 'SET_TOTAL_COUNT'; totalCount: number };

export type PaginationAction =
    | SetPageAction
    | InitPageAction
    | SetPageCountAction
    | SetPageSizeAction
    | SetTotalCountAction;

export const reducer: Reducer<PaginationState, PaginationAction> = produce(
    (draft: Draft<PaginationState>, action: PaginationAction): void => {
        switch (action.type) {
            case 'SET_PAGE':
                setPage(draft, action);
                break;
            case 'INIT_PAGE':
                initPage(draft);
                break;
            case 'SET_PAGE_COUNT':
                draft.pageCount = action.pageCount;
                break;
            case 'SET_TOTAL_COUNT':
                draft.totalCount = action.totalCount;
                break;
            case 'SET_PAGE_SIZE':
                setPageSize(draft, action);
                break;
            default:
                break;
        }
    },
);
// #endregion
