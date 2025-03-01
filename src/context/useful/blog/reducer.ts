import { Enum_Blog_Status } from 'graphql/generated';
import produce, { Draft } from 'immer';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type BLOG_FILTER = {
    filter: BlogFilterState;
};

export type BlogFilterState = {
    name: string;
    title: string;
    status: string | Enum_Blog_Status;
    createdAt: null;
};
export const INITIAL_BLOG_FILTER_STATE: BLOG_FILTER = {
    filter: {
        name: '',
        title: '',
        status: '',
        createdAt: null,
    },
};

const setFilter = (draft: Draft<BLOG_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<BLOG_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: BLOG_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type BlogAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<BLOG_FILTER, BlogAction> = produce(
    (draft: Draft<BLOG_FILTER>, action: BlogAction): void => {
        switch (action.type) {
            case 'SET_FILTER':
                setFilter(draft, action);
                break;

            case 'INIT_FILTER':
                initFilter(draft);
                break;
            default:
                break;
        }
    },
);
// #endregion
